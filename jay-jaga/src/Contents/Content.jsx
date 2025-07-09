import React from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

const Content = ({ data }) => {
  if (!data) return null;
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h6 className="text-4xl font-bold text-amber-900 mb-6 font-playfair">
        {data.heading}
      </h6>
      {data.sections.map((sec, idx) => (
        <div key={idx} className="mb-8">
          {sec.subheading && (
            <h2 className="text-2xl font-semibold text-amber-800 mb-2 font-playfair">
              {sec.subheading}
            </h2>
          )}
          {sec.content &&
            sec.content.map((para, i) => (
              <p key={i} className="text-gray-700 mb-4">
                {para}
              </p>
            ))}
          {sec.images &&
            sec.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={sec.subheading}
                className="rounded-2xl shadow-lg w-full max-w-md object-cover my-4"
              />
            ))}
          {/* Render groups if present */}
          {sec.groups && sec.groups.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border border-amber-200 rounded-lg">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="px-4 py-2 text-left font-semibold text-amber-900">
                      Group Name
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-amber-900">
                      Responsibilities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sec.groups.map((group, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2 font-semibold text-amber-800">
                        {group.name}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {group.responsibility}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {sec.pahandiForms && sec.pahandiForms.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border border-amber-200 rounded-lg">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="px-4 py-2 text-left font-semibold text-amber-900">
                      Festival
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-amber-900">
                      Details
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-amber-900">
                      Type of Movement
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-amber-900">
                      Form of Pahandi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sec.pahandiForms.map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2 font-semibold text-amber-800">
                        {item.festival}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {item.details}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {item.typeOfMovement}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {item.formOfPahandi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {sec.tahiaFacts && sec.tahiaFacts.length > 0 && (
            <div className="my-6">
              <h3 className="text-xl font-semibold text-amber-700 mb-2 font-playfair">
                Tahia Facts
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {sec.tahiaFacts.map((fact, i) => (
                  <li key={i} className="text-gray-700">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sec.ritualsList && sec.ritualsList.length > 0 && (
            <div className="my-6">
              <ul className="list-disc list-inside space-y-2">
                {sec.ritualsList.map((ritual, i) => (
                  <li key={i} className="text-gray-700">
                    {ritual}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Uncomment below if you want to use the image gallery */}
      {/* 
      {data.gallery && data.gallery.length > 0 && (
        <section className="my-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-amber-900 mb-4 font-playfair text-center">
              Festival Gallery
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Swipe or click through some of our favorite festival moments.
            </p>
            <ImageGallery
              items={data.gallery}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              slideDuration={350}
            />
          </div>
        </section>
      )}
      */}
    </div>
  );
};

export default Content;
