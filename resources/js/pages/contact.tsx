'use client';

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type React from 'react';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (value: string) => {
        setFormData((prev) => ({ ...prev, subject: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.message('Message sent', {
            description: "Thank you for contacting us. We'll get back to you soon!",
        });
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'general',
            message: '',
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Us" />
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-18">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
                    <p className="mt-4 text-muted-foreground">
                        We'd love to hear from you. Please fill out the form below or reach out using our contact information.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (optional)</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <RadioGroup value={formData.subject} onValueChange={handleRadioChange}>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="general" id="general" />
                                            <Label htmlFor="general" className="font-normal">
                                                General Inquiry
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="order" id="order" />
                                            <Label htmlFor="order" className="font-normal">
                                                Order Status
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="product" id="product" />
                                            <Label htmlFor="product" className="font-normal">
                                                Product Question
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="support" id="support" />
                                            <Label htmlFor="support" className="font-normal">
                                                Customer Support
                                            </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Visit Our Showroom</CardTitle>
                                <CardDescription>Experience our furniture in person</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="aspect-video overflow-hidden rounded-md">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d760.3707063807009!2d110.85746777005625!3d-7.558319386849639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a17003bc88ba5%3A0x8272f2cdcc4a5467!2sInformatics%20FMIPA%20UNS!5e0!3m2!1sen!2sid!4v1750909496067!5m2!1sen!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        className="aspect-video"
                                    ></iframe>
                                </div>

                                <div className="grid gap-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-[#8B5A2B]" />
                                        <div>
                                            <h4 className="font-medium">Address</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Kentingan Jl. Ir. Sutami No.36, Jebres, Kec. Jebres, Kota Surakarta, Jawa Tengah 57126
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-[#8B5A2B]" />
                                        <div>
                                            <h4 className="font-medium">Phone</h4>
                                            <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-[#8B5A2B]" />
                                        <div>
                                            <h4 className="font-medium">Email</h4>
                                            <p className="text-sm text-muted-foreground">contact@lokalivi.com</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Store Hours</CardTitle>
                                <CardDescription>When you can visit us</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span>9:00 AM - 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday & Sunday</span>
                                        <span className="text-red-500">Close</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Service</CardTitle>
                                <CardDescription>We're here to help</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Our customer service team is available during business hours to assist with any questions or concerns.
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button className="bg-[#8B5A2B] hover:bg-[#6d472a]">Live Chat</Button>
                                    <Button variant="outline">FAQ</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
