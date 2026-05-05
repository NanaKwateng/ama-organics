export const metadata = {
    title: "Privacy Policy",
    description: "Learn how Ama Organics collects and uses your data."
};

export default function PrivacyPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-20 text-gray-800">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4">
                At Ama Organics, accessible from https://ama-organics.com,
                we prioritize your privacy and data protection.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
                Information We Collect
            </h2>
            <p>
                We may collect personal information such as your name, email,
                phone number, and delivery address when you place an order
                or contact us.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
                How We Use Your Information
            </h2>
            <ul className="list-disc ml-6">
                <li>To process and deliver orders</li>
                <li>To improve our services</li>
                <li>To communicate updates and offers</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
                Cookies
            </h2>
            <p>
                We use cookies to enhance user experience and analyze traffic.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
                Third-Party Services
            </h2>
            <p>
                We may use third-party services like analytics tools
                that collect anonymized data.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4">
                Contact Us
            </h2>
            <p>
                If you have questions, contact us at Feli@amaorganics.com
            </p>
        </main>
    );
}