import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface ProductReviewsProps {
    productId: number;
    reviews: Array<{
        id: number;
        rating: number;
        comment: string;
        user_name: string;
        created_at: string;
    }>;
}

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            `/products/${productId}/reviews`,
            {
                rating: rating,
                comment: comment,
            },
            {
                onSuccess: () => {
                    setShowReviewForm(false);
                    setRating(5);
                    setComment('');
                },
            },
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>
                <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
                    Write a Review
                </Button>
            </div>

            {showReviewForm && (
                <div className="rounded-lg border p-6">
                    <h4 className="mb-4 font-medium">Write Your Review</h4>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                                        <Star className={`h-6 w-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Comment</label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts about this product..."
                                rows={4}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit">Submit Review</Button>
                            <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {reviews.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{review.user_name}</span>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-muted-foreground">{review.created_at}</span>
                            </div>
                            {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
