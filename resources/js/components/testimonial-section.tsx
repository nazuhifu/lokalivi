import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Interior Designer",
    content:
      "SolHome furniture pieces are exceptional in quality and design. My clients always fall in love with the craftsmanship and attention to detail.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    role: "Homeowner",
    content:
      "We furnished our entire living room with SolHome pieces. The quality is outstanding and the customer service was excellent from start to finish.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily Rodriguez",
    role: "Architect",
    content:
      "As an architect, I appreciate the perfect balance of form and function in SolHome's designs. Their pieces complement my projects beautifully.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function TestimonialSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="border-none bg-[#f8f5f0]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="object-cover"
                />
              </div>
              <blockquote className="mt-4">
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </blockquote>
              <div className="mt-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
