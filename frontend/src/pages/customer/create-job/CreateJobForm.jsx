import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export const CreateJobForm = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Create New Job</h2>

      {/* Job Name */}
      <div className="flex flex-col space-y-2">
        <Label>Job Name</Label>
        <Input
          value={formData.jobName}
          onChange={(e) => handleChange("jobName", e.target.value)}
          placeholder="Enter job name"
          
        />
      </div>

      {/* Priority */}
      <div className="flex flex-col space-y-2">
        <Label>Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => handleChange("priority", value)}
        >
          <SelectTrigger >
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>                
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <Button type="submit" className="w-full mt-2">
        Create Job
      </Button>
    </form>
  );
};
