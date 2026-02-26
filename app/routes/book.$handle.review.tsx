import { useOutletContext, Form, useNavigation } from "react-router";
import type { Route } from "./+types/book.$handle.review";
import type { BookingContextType } from "./book.$handle";
import { shopifyFetch, GET_VARIANT_PRICE_QUERY } from "~/shopify.server";
import { redirect } from "react-router";

// --- SERVER ACTION: CREATE CART & REDIRECT ---

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const variantId = formData.get("variantId") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const eventType = formData.get("eventType") as string;
  const notes = formData.get("notes") as string;

  // 1. FETCH THE REAL PRICE (Securely on the server)
  const priceData = await shopifyFetch(GET_VARIANT_PRICE_QUERY, { id: variantId });

  if (!priceData.node) {
    throw new Error("Invalid Variant ID");
  }

  // 2. CALCULATE THE FEE DYNAMICALLY
  const productPrice = parseFloat(priceData.node.price.amount);
  
  // Calculate 5% and round up to the nearest whole number
  // Example: If price is 150,000, fee is 7,500.
  // Since your service fee product is $1 (or ₦1), quantity = 7500.
  const feeAmount = Math.ceil(productPrice * 0.05);

  //remove graphQL id
  const vIdOnly = variantId.replace("gid://shopify/ProductVariant/", "");
  // console.log(`Product Price: ${productPrice}, Calculated Fee Quantity: ${feeAmount}`);
  // console.log(`Variant ID ALONE: ${vIdOnly}, VARIANT ID: ${variantId}`);

  // 3. CONSTRUCT CART LINES
  const lines = [
    // The Main Service
    {
      merchandiseId: variantId,
      quantity: 1,
      attributes: [
        { key: "Event Date", value: date },
        { key: "Event Location", value: location },
        { key: "Event Type", value: eventType },
        { key: "Special Request", value: notes || "None" },
      ],
    },
    // The Calculated Service Fee
    {
      merchandiseId: "gid://shopify/ProductVariant/52084821229890", // Your Service Fee ID
      quantity: feeAmount, // DYNAMICALLY SET QUANTITY,
      parent: {
        // CartLineParentInput
        merchandiseId: variantId
      },
      attributes: [
        { key: "Service Charge", value: "5%" }
      ]
    }
  ];

  // 4. SEND TO SHOPIFY
  const mutation = `
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, { lines });

  if (data.cartCreate.userErrors.length > 0) {
    console.error(data.cartCreate.userErrors);
    return null;
  }

  return redirect(data.cartCreate.cart.checkoutUrl);
}

// --- COMPONENT ---
export default function BookingReview() {
  const { bookingData, product } = useOutletContext<BookingContextType>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const variant = product.variants.nodes[0];
  const price = parseFloat(variant.price.amount);
  const fee = price * 0.05;
  const total = price + fee;

  const formatMoney = (val: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: variant.price.currencyCode }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-in">
      
      {/* LEFT COLUMN: REVIEW DETAILS */}
      <div className="lg:col-span-8 space-y-8">
        <section className="bg-white p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assignment</span>
                Booking Summary
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Service</p>
                    <p className="font-bold text-slate-900">{product.title}</p>
                    <p className="text-sm text-slate-600">{variant.title}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Vendor</p>
                    <p className="font-bold text-slate-900">{product.vendor}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">verified</span> Verified Pro
                    </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Date & Time</p>
                    <p className="font-bold text-slate-900">{bookingData.date}</p>
                    <p className="text-sm text-slate-600">Full Day Event</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Location</p>
                    <p className="font-bold text-slate-900">{bookingData.location}</p>
                    <p className="text-sm text-slate-600">{bookingData.eventType}</p>
                </div>
            </div>

            {bookingData.notes && (
                <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                    <p className="text-xs text-yellow-700 uppercase font-bold mb-1">Special Request</p>
                    <p className="text-sm text-yellow-900 italic">"{bookingData.notes}"</p>
                </div>
            )}
        </section>

        <section className="bg-white p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold mb-6">Cancellation Policy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
                Free cancellation up to 7 days before the event. Cancellations made within 7 days of the event date will incur a 50% fee.
            </p>
        </section>
      </div>

      {/* RIGHT COLUMN: FINAL SUMMARY & SUBMIT */}
      <div className="lg:col-span-4">
        <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-xl">
           <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
           <h3 className="text-lg font-black mb-6">Payment Breakdown</h3>

           <div className="space-y-3 border-b border-slate-100 pb-6 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold">{formatMoney(price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service Fee (5%)</span>
                    <span className="font-bold">{formatMoney(fee)}</span>
                </div>
           </div>
           
           <div className="flex justify-between items-end mb-8">
                <span className="font-black text-xl">Total</span>
                <span className="font-black text-3xl text-primary">{formatMoney(total)}</span>
           </div>

           {/* THE CHECKOUT FORM */}
           <Form method="post">
                {/* Hidden inputs to pass state to the server action */}
                <input type="hidden" name="variantId" value={variant.id} />
                <input type="hidden" name="date" value={bookingData.date} />
                <input type="hidden" name="location" value={bookingData.location} />
                <input type="hidden" name="eventType" value={bookingData.eventType} />
                <input type="hidden" name="notes" value={bookingData.notes} />

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                           <span className="material-symbols-outlined animate-spin">refresh</span>
                           Processing...
                        </>
                    ) : (
                        <>
                           <span className="material-symbols-outlined">lock</span>
                           Confirm & Pay
                        </>
                    )}
                </button>
           </Form>
           
           <p className="mt-4 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                Secured by Shopify Checkout
           </p>
        </div>
      </div>
    </div>
  );
}