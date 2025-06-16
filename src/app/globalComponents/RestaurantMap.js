export default function RestaurantMap({ mapUrl }) {
  if (!mapUrl) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Location</h2>
      <div className="w-full h-[450px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
