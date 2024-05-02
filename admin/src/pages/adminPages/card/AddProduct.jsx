import PreView from "./PreView";
const AddProduct = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600 p-3">Add Product</h2>
        <div className="bg-white rounded shadow-lg p-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <PreView />
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="full_name">Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    defaultValue=""
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="email">Description</label>
                  <textarea
                    name="email"
                    id="email"
                    className="border mt-1 rounded px-4 w-full bg-gray-50"
                    defaultValue=""
                    placeholder="email@domain.com"
                  />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="address">Price</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    defaultValue=""
                    placeholder=""
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="soda">In Stock</label>
                  <input
                    type="number"
                    name="soda"
                    id="soda"
                    placeholder="0"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    defaultValue="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="image1">Image 1</label>
                  <input
                    type="file"
                    name="image1"
                    id="image1"
                    accept="image/*"
                    className="border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="image2">Image 2</label>
                  <input
                    type="file"
                    name="image2"
                    id="image2"
                    accept="image/*"
                    className="border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div className="md:col-span-5 text-right">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
