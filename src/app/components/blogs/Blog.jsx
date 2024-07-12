import React from 'react';

function Blog({ title, date, readTime, details, image }) {
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center p-8 pt-12">
      <article className="max-w-3xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-4">{title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>Published on {date}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </header>

        <section className="prose lg:prose-xl">
          {Object.keys(details).map((sectionKey, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-light text-indigo-700 mb-4">{sectionKey}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{details[sectionKey]}</p>
            </div>
          ))}

          {image && (
            <figure className="my-6">
              <img className="w-full h-auto rounded-lg" src={image.src} alt={image.alt} />
              {image.caption && (
                <figcaption className="text-sm text-gray-500 mt-2">{image.caption}</figcaption>
              )}
            </figure>
          )}

        </section>

        <footer className="mt-8 text-sm text-gray-600">
          <p>
            Thank you for reading! If you found this blog post helpful, feel free to share it with
            your friends and colleagues.
          </p>
        </footer>
      </article>
    </section>
  );
}

export default Blog;
