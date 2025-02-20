import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/lib/api";

const formSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  phone: z.string().refine((value) => /^\+?[1-9]\d{1,14}$/.test(value), {
    message: "Invalid phone number format",
  }),
});

const ShippingAddressForm = ({ cart }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const navigate = useNavigate();

  function handleSubmit(values) {
    const orderItems = cart.map(item => ({
      product: {
        _id: item.product._id,
        name: item.product.name,
        price: Number(item.product.price),
        image: item.product.image,
        description: item.product.description
      },
      quantity: item.quantity
    }));

    const orderData = {
      items: orderItems,
      shippingAddress: values
    };

    createOrder(orderData)
      .unwrap()
      .then(response => navigate(`/complete/${response._id}`))
      .catch(error => {
        form.setError('root', {
          type: 'manual',
          message: error.data?.message || 'Failed to create order'
        });
      });
  }

  return (
    <div className="p-4 mx-auto max-w-lg md:p-6 lg:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {["line_1", "line_2", "city", "state", "zip_code", "phone"].map(field => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{field.name.replace("_", " ")}</FormLabel>
                    <FormControl>
                      <Input placeholder={field.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/shop/payment">
              <Button type="submit" className="w-full md:w-auto">Proceed to Payment</Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
