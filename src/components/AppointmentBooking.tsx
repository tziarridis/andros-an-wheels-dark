
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

interface AppointmentBookingProps {
  carId?: string;
}

interface AppointmentForm {
  name: string;
  email: string;
  phone: string;
  appointment_date: string;
  appointment_type: string;
  message: string;
}

const AppointmentBooking = ({ carId }: AppointmentBookingProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AppointmentForm>();

  const onSubmit = async (data: AppointmentForm) => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        ...data,
        car_id: carId || null,
        appointment_date: new Date(data.appointment_date).toISOString(),
      };

      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke('send-notification-email', {
        body: {
          type: 'appointment',
          data: appointmentData
        }
      });

      toast({
        title: "Appointment Booked!",
        description: "We'll send you a confirmation email shortly.",
      });

      reset();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Book an Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="bg-black border-gray-600 text-white"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-white flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="bg-black border-gray-600 text-white"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-white flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                {...register('phone')}
                className="bg-black border-gray-600 text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="appointment_type" className="text-white">
                Appointment Type
              </Label>
              <Select onValueChange={(value) => setValue('appointment_type', value)}>
                <SelectTrigger className="bg-black border-gray-600 text-white">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test_drive">Test Drive</SelectItem>
                  <SelectItem value="viewing">Vehicle Viewing</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="finance_meeting">Finance Meeting</SelectItem>
                </SelectContent>
              </Select>
              {errors.appointment_type && (
                <p className="text-red-400 text-sm mt-1">Please select an appointment type</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="appointment_date" className="text-white flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Preferred Date & Time
            </Label>
            <Input
              id="appointment_date"
              type="datetime-local"
              {...register('appointment_date', { required: 'Date and time is required' })}
              className="bg-black border-gray-600 text-white"
              min={new Date().toISOString().slice(0, 16)}
            />
            {errors.appointment_date && (
              <p className="text-red-400 text-sm mt-1">{errors.appointment_date.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message" className="text-white">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              className="bg-black border-gray-600 text-white"
              placeholder="Any specific requirements or questions?"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;
