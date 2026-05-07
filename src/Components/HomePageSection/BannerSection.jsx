const BannerSection = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
        <p className="text-lg mb-6">Get 20% off on all products this week!</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default BannerSection;
