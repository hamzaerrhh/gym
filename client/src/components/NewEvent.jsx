const NewEvent = () => {
  return (
    <section className="py-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div
          className="flex-1 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1607068891828-f16297950a66?q=80&w=1804&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="h-screen">
            <div className="relative flex-1 bg-cover bg-center">
              {/* Day and Month */}
              <div className="absolute top-0 left-0 p-4 text-white">
                <p className="font-bold">12 July</p>
              </div>
              {/* Location */}
              <div className="absolute top-0 right-0 p-4 text-white">
                <p className="font-bold"> Jbal</p>
              </div>
              <div className="h-screen"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-950 dark:text-gray-50">
          <h2 className="text-3xl font-semibold mb-4">Price: 89€</h2>
          <p className="text-lg text-center mb-8">
            Nemo deserunt possimus quo provident recusandae! Dolores qui
            architecto omnis pariatur eos voluptatibus sequi cum, non nesciunt
            aspernatur a?
          </p>
          <button className="px-8 py-3 text-lg font-semibold rounded-lg bg-gray-100 text-gray-900 shadow-md hover:bg-gray-200 transition-colors duration-300">
            Enroll now
          </button>
        </div>
      </div>
    </section>
  );
};
export default NewEvent;
