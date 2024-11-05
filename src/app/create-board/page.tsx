"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Briefcase,
  Building,
  Globe,
  Image,
  Linkedin,
  CircleOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBoard } from "@/actions/board";
import { uploadImage } from "@/actions/uploadImage";
import { toast } from "sonner";
import { createSwapy } from "swapy";
import { RxCrossCircled, RxDragHandleDots2 } from "react-icons/rx";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Field = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type Question = {
  id: string;
  text: string;
};

const availableFields: Field[] = [
  { id: "name", name: "Name", icon: <User className="w-4 h-4" /> },
  { id: "email", name: "Email", icon: <Mail className="w-4 h-4" /> },
  {
    id: "designation",
    name: "Designation",
    icon: <Briefcase className="w-4 h-4" />,
  },
  { id: "company", name: "Company", icon: <Building className="w-4 h-4" /> },
  { id: "website", name: "Website", icon: <Globe className="w-4 h-4" /> },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
];

const defaultQuestions: Question[] = [
  { id: "q1", text: "How would you rate your overall experience?" },
  { id: "q2", text: "What did you like most about our product/service?" },
  { id: "q3", text: "How can we improve?" },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Board name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  fields: z.array(z.string()).min(1, {
    message: "Select at least one field.",
  }),
  questions: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .min(3)
    .max(5),
  imageType: z.enum(["logo", "icon", "banner"]),
  iconEmoji: z.string().optional(),
  thankYouMessage: z.string().min(1, {
    message: "Thank you message is required.",
  }),
  isRedirectEnabled: z.boolean(),
  redirectUrl: z.string().url().optional().or(z.literal("")),
});

export default function CreateBoard() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      fields: ["name", "email"],
      questions: defaultQuestions,
      imageType: "logo",
      thankYouMessage: "Thank you for your testimonial!",
      iconEmoji: "",
      isRedirectEnabled: false,
      redirectUrl: "",
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadImage(formData);
    },
  });

  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      toast.success("Your testimonial board has been created.", {
        id: "create-board",
      });
      router.push(`/boards/${data._id}`);
    },
    onError: (error) => {
      console.error("Error creating board:", error);
      toast.error("Failed to create testimonial board. Please try again.", {
        id: "create-board",
      });
    },
  });

  const toggleField = (fieldId: string) => {
    const currentFields = form.getValues("fields");
    const updatedFields = currentFields.includes(fieldId)
      ? currentFields.filter((id) => id !== fieldId)
      : [...currentFields, fieldId];
    form.setValue("fields", updatedFields);
    form.trigger();
  };

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const addQuestion = () => {
    if (newQuestion.trim() && questions.length < 5) {
      appendQuestion({ id: `q${Date.now()}`, text: newQuestion.trim() });
      setNewQuestion("");
    }
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      removeQuestion(index);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await uploadImageMutation.mutateAsync(imageFile);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.", {
          id: "image-upload",
        });
        return;
      }
    }

    const boardData = {
      ...values,
      imageUrl,
      questions: values.questions.map((q) => ({ id: q.id, text: q.text })),
    };
    console.log(boardData.questions);
    createBoardMutation.mutate(boardData);
  };
  useEffect(() => {
    const container = document.querySelector(".container")!;
    const swapy = createSwapy(container, {
      swapMode: "hover",
    });
    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Your Testimonial Board
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a catchy title for your board"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this testimonial board is for"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Personalize your board
              </h2>
              <FormField
                control={form.control}
                name="imageType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tabs
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="logo">Logo</TabsTrigger>
                          <TabsTrigger value="icon">Icon</TabsTrigger>
                          <TabsTrigger value="banner">Banner</TabsTrigger>
                        </TabsList>
                        <TabsContent value="logo">
                          <div className="flex items-center justify-center h-32 bg-muted rounded-md">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setImageFile(e.target.files?.[0] || null)
                              }
                              className="hidden"
                              id="logo-upload"
                            />
                            <label
                              htmlFor="logo-upload"
                              className="cursor-pointer flex items-center"
                            >
                              <Image className="w-8 h-8" />
                              <span className="ml-2">Upload your logo</span>
                            </label>
                          </div>
                        </TabsContent>
                        <TabsContent value="icon">
                          <div className="flex items-center justify-center  bg-muted rounded-md p-5">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className="h-[100px] group w-full "
                                >
                                  {form.watch("imageType") ? (
                                    <div
                                      className={cn(
                                        "flex flex-col items-center gap-2"
                                      )}
                                    >
                                      <span className="text-5xl" role="img">
                                        {form.getValues().iconEmoji}
                                      </span>
                                      <p className="text-xs text-muted-foreground">
                                        Click to change
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={cn(
                                        "flex flex-col items-center gap-2 "
                                      )}
                                    >
                                      <CircleOff className="h-[48px] w-[48px]" />
                                      <p className="text-xs text-muted-foreground group-hover:text-background">
                                        Click to select
                                      </p>
                                    </div>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Picker
                                  data={data}
                                  theme="light"
                                  onEmojiSelect={(emoji: {
                                    native: string;
                                  }) => {
                                    field.onChange("icon");
                                    form.setValue("iconEmoji", emoji.native);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </TabsContent>
                        <TabsContent value="banner">
                          <div className="flex items-center justify-center h-32 bg-muted rounded-md">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setImageFile(e.target.files?.[0] || null)
                              }
                              className="hidden"
                              id="banner-upload"
                            />
                            <label
                              htmlFor="banner-upload"
                              className="cursor-pointer flex items-center"
                            >
                              <Image className="w-8 h-8" />
                              <span className="ml-2">
                                Upload a banner image
                              </span>
                            </label>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Testimonial Questions
              </h2>
              <ul className="space-y-2 container">
                {form.getValues("questions").map((question, index) => (
                  <li key={question.id} className="  " data-swapy-slot={index}>
                    <div
                      className="flex items-center justify-between relative bg-muted rounded-md p-2"
                      data-swapy-item={index}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="cursor-pointer inline-block"
                          data-swapy-handle
                        >
                          <RxDragHandleDots2 />
                        </div>

                        <span>{question.text}</span>
                      </div>
                      <div>
                        {questions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveQuestion(index)}
                          >
                            <RxCrossCircled />
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {form.getValues("questions").length < 5 && (
                <div className="flex space-x-2 mt-4">
                  <Input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter a new question"
                  />
                  <Button type="button" onClick={addQuestion}>
                    Add
                  </Button>
                </div>
              )}
              <FormMessage>
                {form.formState.errors.questions?.message}
              </FormMessage>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                What information do you want to collect?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 swap-container">
                {availableFields.map((field, index) => (
                  <Button
                    key={field.id}
                    type="button"
                    data-swapy-slot={index}
                    variant={
                      form.getValues("fields").includes(field.id)
                        ? "default"
                        : "outline"
                    }
                    className="justify-start"
                    onClick={() => toggleField(field.id)}
                  >
                    {field.icon}
                    <span className="ml-2">{field.name}</span>
                  </Button>
                ))}
              </div>
              <FormMessage>{form.formState.errors.fields?.message}</FormMessage>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Thank You Page</h2>
              <FormField
                control={form.control}
                name="thankYouMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thank You Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a thank you message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isRedirectEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Enable redirect after submission
                      </FormLabel>
                      <FormDescription>
                        Redirect users to a custom URL after submitting their
                        testimonial
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.watch("isRedirectEnabled") && (
                <FormField
                  control={form.control}
                  name="redirectUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Redirect URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/thank-you"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={
                createBoardMutation.isPending || uploadImageMutation.isPending
              }
            >
              {createBoardMutation.isPending || uploadImageMutation.isPending
                ? "Creating..."
                : "Create Your Testimonial Board"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
