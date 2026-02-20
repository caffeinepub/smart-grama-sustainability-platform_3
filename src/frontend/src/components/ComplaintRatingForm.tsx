import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAddComplaintRating } from '../hooks/useQueries';
import { Star } from 'lucide-react';

interface ComplaintRatingFormProps {
  complaintId: string;
}

export default function ComplaintRatingForm({ complaintId }: ComplaintRatingFormProps) {
  const { t } = useLanguage();
  const addRating = useAddComplaintRating();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async () => {
    if (rating === 0) return;
    await addRating.mutateAsync({ id: complaintId, rating });
  };

  return (
    <div className="border-t pt-3 space-y-2">
      <p className="text-sm font-medium">{t('rateWork')}</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'text-gray-300'
              }
            />
          </button>
        ))}
      </div>
      <Button size="sm" onClick={handleSubmit} disabled={rating === 0 || addRating.isPending}>
        {addRating.isPending ? t('submitting') : t('submitRating')}
      </Button>
    </div>
  );
}
