import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

import { AuthContext } from '../../context/auth_context';
export default function ShippingForm({ onClose }) {
  const [formData, setFormData] = useState({
    order_id: '',
    order_date: '',
    pickup_location: 'Primary',
    pickup_address: '1810/A, Kumaraswamy Layout',
    pickup_city: 'Bangalore',
    pickup_state: 'Karnataka',
    pickup_country: 'India',
    pickup_pincode: '560078',
    pickup_name:'',
    billing_customer_name: '',
    billing_address: '',
    billing_city: '',
    billing_pincode: '',
    billing_state: '',
    billing_country: '',
    billing_email: '',
    billing_phone: '',
    shipping_is_billing: false,
    shipping_customer_name: '',
    shipping_address: '',
    shipping_city: '',
    shipping_pincode: '',
    shipping_country: 'India',
    shipping_state: '',
    shipping_phone: '',
    order_items: [{ name: '', sku: '', units: '', selling_price: '' }],
    payment_method: 'COD',
    sub_total: '',
    length: '',
    breadth: '',
    height: '',
    weight: '',
    uid: '',
  });
  const [flag, setFlag] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const responseForm = {
    order_id: 16161616,
    shipment_id: 15151515,
    status: 'NEW',
    status_code: 1,
    onboarding_completed_now: 0,
    awb_code: null,
    courier_company_id: '1234',
    courier_name: 'DHL Courier',
  };
  if (flag) {
    toast.success('Order tracking information added successfully');
    setFlag(false);
  }
  const handleShippingIsBillingChange = (e) => {
    const isChecked = e.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      shipping_is_billing: isChecked,
      shipping_customer_name: isChecked ? prevData.billing_customer_name : '',
      shipping_address: isChecked ? prevData.billing_address : '',
      shipping_city: isChecked ? prevData.billing_city : '',
      shipping_pincode: isChecked ? prevData.billing_pincode : '',
      shipping_country: isChecked ? prevData.billing_country : 'India',
      shipping_state: isChecked ? prevData.billing_state : '',
      shipping_phone: isChecked ? prevData.billing_phone : '',
    }));
  };

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      order_items: [
        ...prevData.order_items,
        { name: '', sku: '', units: '', selling_price: '' },
      ],
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.order_items];
    updatedItems[index][name] = value;
    setFormData({ ...formData, order_items: updatedItems });
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100000);
    return `ORDER-${timestamp}-${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderId = generateOrderId();
    const formDataWithOrderId = { ...formData, order_id: orderId };
    console.log('Shipping details submitted:', formDataWithOrderId);
    console.log(formData.uid);

    try {
      // First, add the new document to 'tracks' collection
      const tracksRef = collection(db, 'tracks');
      // const newTrackDoc = await addDoc(tracksRef, formDataWithOrderId);
      const newTrackDoc = await addDoc(tracksRef, {
        responseForm,
        formDataWithOrderId,
      });

      const trackId = newTrackDoc.id;

      // Update farmer's document
      const farmerRef = doc(db, 'users', formData.uid);
      const farmerSnap = await getDoc(farmerRef);

      if (farmerSnap.exists()) {
        await updateDoc(farmerRef, {
          tracks: arrayUnion(trackId),
        });
      } else {
        toast.error("Farmer UID doesn't exist");
        return;
      }

      // Update buyer's document
      const buyerRef = doc(db, 'users', currentUser.uid);
      const buyerSnap = await getDoc(buyerRef);

      if (buyerSnap.exists()) {
        await updateDoc(buyerRef, {
          tracks: arrayUnion(trackId),
        });
      } else {
        toast.error("Buyer UID doesn't exist");
        return;
      }
      setFlag(true);
      toast.success('Order tracking information added successfully');
      onClose();
    } catch (err) {
      console.error('Error updating tracking information:', err);
      toast.error('Failed to update tracking information');
    }
  };

  return (
    <div className={`flex items-start overflow-scroll justify-start`}>
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 overflow-scroll lg:w-2/3 xl:w-1/2 max-h-[90vh] flex flex-col">
        <div className="p-2 overflow-y-scroll flex-grow">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 sticky top-0 bg-white py-2">
            Details for Shipping
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="billing_customer_name"
                  placeholder="Buyer's Name"
                  value={formData.billing_customer_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Date
                </label>
                <input
                  type="date"
                  name="order_date"
                  value={formData.order_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Address
              </label>
              <input
                type="text"
                name="billing_address"
                placeholder="Buyer's address"
                value={formData.billing_address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your City
                </label>
                <input
                  type="text"
                  name="billing_city"
                  placeholder="Buyer's City"
                  value={formData.billing_city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City Pincode
                </label>
                <input
                  type="number"
                  placeholder="Buyer's Pincode"
                  name="billing_pincode"
                  value={formData.billing_pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your State
                </label>
                <input
                  type="text"
                  name="billing_state"
                  placeholder="Buyer's state"
                  value={formData.billing_state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Country
                </label>
                <input
                  type="text"
                  name="billing_country"
                  placeholder="Buyer's country"
                  value={formData.billing_country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="billing_email"
                  value={formData.billing_email}
                  placeholder="Buyer's Email"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Phone
                </label>
                <input
                  type="tel"
                  name="billing_phone"
                  placeholder="Buyer's Phone"
                  value={formData.billing_phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Is Shipping Same as Billing?
              </label>
              <input
                type="checkbox"
                name="shipping_is_billing"
                checked={formData.shipping_is_billing}
                onChange={handleShippingIsBillingChange}
                className="mr-2"
                defaultValue={true}
              />
              Yes
            </div>

            {!formData.shipping_is_billing && (
              <>
                <div className="flex flex-row gap-2 items-center justify-between w-full">
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Customer Name
                    </label>
                    <input
                      type="text"
                      name="shipping_customer_name"
                      value={formData.shipping_customer_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between w-full">
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping City
                    </label>
                    <input
                      type="text"
                      name="shipping_city"
                      value={formData.shipping_city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Pincode
                    </label>
                    <input
                      type="number"
                      name="shipping_pincode"
                      value={formData.shipping_pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between w-full">
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping State
                    </label>
                    <input
                      type="text"
                      name="shipping_state"
                      value={formData.shipping_state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>

                  <div className="mb-4 w-full ">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Country
                    </label>
                    <input
                      type="text"
                      name="shipping_country"
                      value={formData.shipping_country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Phone
                    </label>
                    <input
                      type="tel"
                      name="shipping_phone"
                      value={formData.shipping_phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!formData.shipping_is_billing}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farmer UID:
                </label>
                <input
                  type="text"
                  name="uid"
                  placeholder="Farmer's UID"
                  value={formData.uid}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farmer&apos;s Name:
                </label>
                <input
                  type="text"
                  name="uid"
                  placeholder="Farmer's name"
                  value={formData.pickup_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4"></div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Address
              </label>
              <input
                type="text"
                name="pickup_address"
                value={formData.pickup_address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup City
                </label>
                <input
                  type="text"
                  name="pickup_city"
                  value={formData.pickup_city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Pincode
                </label>
                <input
                  type="number"
                  name="pickup_pincode"
                  value={formData.pickup_pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup State
                </label>
                <input
                  type="text"
                  name="pickup_state"
                  value={formData.pickup_state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Country
                </label>
                <input
                  type="text"
                  name="pickup_country"
                  value={formData.pickup_country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Items
              </label>
              {formData.order_items.map((item, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Item Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="sku"
                    value={item.sku}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Item SKU"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    required
                  />
                  <input
                    type="number"
                    name="units"
                    value={item.units}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Units"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    required
                  />
                  <input
                    type="number"
                    name="selling_price"
                    value={item.selling_price}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Selling Price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Another Item
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

ShippingForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  farmer_uid: PropTypes.string.isRequired,
};
