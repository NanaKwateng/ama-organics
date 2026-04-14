export default function WhySection() {
    return (
        <section className="py-24 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
                Why Choose Ama Organics?
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
                <div>
                    <h3 className="font-bold text-lg mb-2">Pure & Natural</h3>
                    <p className="text-gray-600 text-sm">
                        No additives, no chemicals — just authentic palm oil.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Fresh from Source</h3>
                    <p className="text-gray-600 text-sm">
                        Harvested and processed locally for maximum freshness.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                    <p className="text-gray-600 text-sm">
                        Delivered quickly across Ghana to your doorstep.
                    </p>
                </div>
            </div>
        </section>
    );
}