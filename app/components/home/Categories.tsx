import { Link } from "react-router";

interface Collection {
  id: string;
  title: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
}

export default function Categories({ collections }: { collections: Collection[] }) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl md:text-3xl font-extrabold text-accent-purple dark:text-white">
          Browse by Category
        </h3>
        {/* <Link
          to="/collections"
          className="text-primary font-bold flex items-center gap-1 hover:underline"
        >
          View All <span className="material-symbols-outlined">chevron_right</span>
        </Link> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {collections.map((cat) => (
          <Link
            key={cat.id}
            to={`/collections/${cat.handle}`}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/5 shadow-md flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-all overflow-hidden mb-3">
              {cat.image ? (
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  alt={cat.image.altText || cat.title}
                  src={cat.image.url}
                />
              ) : (
                <span className="material-symbols-outlined text-gray-400 text-3xl">
                  image
                </span>
              )}
            </div>
            <span className="font-bold text-sm text-center">{cat.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}