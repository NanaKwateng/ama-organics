export default function ProductSection() {
    return (
        <section className="py-24 px-6 bg-white text-center">
            <h2 className="text-3xl font-bold mb-12">Our Products</h2>

            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {["500ml", "1L", "5L Bulk"].map((size) => (
                    <div key={size} className="border p-6">
                        <h3 className="font-bold text-xl mb-2">{size}</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Premium Ghanaian palm oil
                        </p>
                        <button className="bg-orange-900 text-white px-4 py-2 text-xs uppercase">
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}