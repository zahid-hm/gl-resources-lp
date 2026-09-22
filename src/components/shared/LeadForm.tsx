"use client";

import { ArrowRight } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { PhoneField } from "@/components/shared/PhoneField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LeadForm({ idPrefix, onSubmitted }: { idPrefix: string; onSubmitted?: () => void }) {
  const {
    register,
    control,
    handleSubmit,
    onValid,
    formState: { errors, isSubmitting },
  } = useLeadForm({ onSubmitted });

  return (
    <form id={`${idPrefix}-hero-form`} onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`${idPrefix}-firstName`} className="text-sm-body text-gray-700 mb-1.5">First Name</Label>
          <Input id={`${idPrefix}-firstName`} placeholder="" className="h-10" {...register("firstname")} />
          {errors.firstname && <p className="text-sm-body text-error mt-1">{errors.firstname.message}</p>}
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-lastName`} className="text-sm-body text-gray-700 mb-1.5">Last Name</Label>
          <Input id={`${idPrefix}-lastName`} placeholder="" className="h-10" {...register("lastname")} />
          {errors.lastname && <p className="text-sm-body text-error mt-1">{errors.lastname.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-workEmail`} className="text-sm-body text-gray-700 mb-1.5">Email</Label>
        <Input id={`${idPrefix}-workEmail`} type="email" inputMode="email" placeholder="" className="h-10" {...register("email")} />
        {errors.email && <p className="text-sm-body text-error mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-phoneNumber`} className="text-sm-body text-gray-700 mb-1.5">Phone Number</Label>
        <PhoneField id={`${idPrefix}-phoneNumber`} control={control} />
        {errors.phone && <p className="text-sm-body text-error mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-company`} className="text-sm-body text-gray-700 mb-1.5">Company</Label>
        <Input id={`${idPrefix}-company`} placeholder="" className="h-10" {...register("company")} />
        {errors.company && <p className="text-sm-body text-error mt-1">{errors.company.message}</p>}
      </div>
      <Button
        variant="ghost"
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 rounded-lg text-base transition-all"
      >
        Get a Quote
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
