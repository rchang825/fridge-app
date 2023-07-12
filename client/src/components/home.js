import Navbar from "./navbar";

export default function Home() {
    return (
    <div>
        <Navbar />
        <p className="centered">Click "New List" to get started! Once that page loads, make sure to save the link or at least hold onto your list ID, located in the URL after /list/. It will allow you to come back to your unique list.</p>
    </div>
    );
};