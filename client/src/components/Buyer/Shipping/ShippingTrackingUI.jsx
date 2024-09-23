import { IoBagCheck } from 'react-icons/io5';
import { FaTruckMoving } from 'react-icons/fa';
import { LuPackage } from 'react-icons/lu';
import { FaLongArrowAltRight } from "react-icons/fa";
import PropTypes from 'prop-types';
const ShippingTrackingUI = ({ order }) => {
  const { formDataWithOrderId, responseForm } = order;

  const stages = [
    {
      name: 'Order Placed',
      icon: LuPackage,
      date: formDataWithOrderId?.order_date,
    },
    { name: 'Out for Delivery', icon: FaTruckMoving, date: '' },
    { name: 'Delivered', icon: IoBagCheck, date: '' },
  ];

  const currentStage =
    responseForm?.status === 'delivered'
      ? 2
      : responseForm?.status === 'out_for_delivery'
        ? 1
        : 0;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className='w-full'> 
        <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>
        <div className="w-full flex items-center justify-center">
          {stages.map((stage, index) => (
            <>
            <div
              key={stage.name}
              className="flex items-center justify-center gap-2 mb-8 p-2 w-full"
            >
              <div
                className={`rounded-full h-16 w-20 flex items-center justify-center ${
                  index <= currentStage
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <stage.icon size={25} />
              </div>
              <div className="ml-4">
                <p className="font-semibold">{stage.name}</p>
                <p className="text-sm text-gray-500">
                  {stage.date || 'Pending'}
                </p>
              </div>
              
            </div>
            <div>
            {index < stages.length - 1 && (
                <div className="flex-shrink-0 w-16 flex items-center justify-center">
                  <FaLongArrowAltRight
                    size={24}
                    className={
                      index < currentStage ? 'text-green-500' : 'text-gray-300'
                    }
                  />
                </div>
              )}
            </div>
            </>
          ))}
        </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold">
            Order ID: {formDataWithOrderId?.order_id || 'N/A'}
          </p>
          <p className="font-semibold">
            Shipment ID: {responseForm?.shipment_id || 'N/A'}
          </p>
          <p>
            Status:{' '}
            {responseForm?.status_code == 1
              ? 'Initiated'
              : responseForm?.status || 'N/A'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-6 font-semibold mb-2">
          <h3 className="font-bold mb-2">Shipping Details: </h3>
          <p>
            Farmer Name: {formDataWithOrderId?.shipping_customer_name || 'N/A'}
          </p>
          <p>
            Farmer Address: {formDataWithOrderId?.shipping_address || 'N/A'}
          </p>
          <p>Farmer Number: {formDataWithOrderId?.shipping_phone || 'N/A'} </p>
          <p>Shipping City: {formDataWithOrderId?.shipping_city || 'N/A'}, </p>
          <p>
            {' '}
            Shipping Pincode: {formDataWithOrderId?.shipping_pincode ||
              'N/A'}{' '}
          </p>
          <p>Shipping State: {formDataWithOrderId?.shipping_state || 'N/A'} </p>
          <p>
            Shipping Country: {formDataWithOrderId?.shipping_country || 'N/A'}
          </p>
        </div>
        
      </div>
    </div>
  );
};

ShippingTrackingUI.propTypes = {
    order: PropTypes.shape({
      formDataWithOrderId: PropTypes.shape({
        order_id: PropTypes.string,
        order_date: PropTypes.string,
        shipping_customer_name: PropTypes.string,
        shipping_address: PropTypes.string,
        shipping_phone: PropTypes.string,
        shipping_city: PropTypes.string,
        shipping_pincode: PropTypes.string,
        shipping_state: PropTypes.string,
        shipping_country: PropTypes.string,
      }),
      responseForm: PropTypes.shape({
        shipment_id: PropTypes.string,
        status_code: PropTypes.number,
        status: PropTypes.string,
      }),
    }).isRequired,
  };
  
export default ShippingTrackingUI;
