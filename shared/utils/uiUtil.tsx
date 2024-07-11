import SkeletonCard from '@/components/SkeletonCard';

export const generateSkeletonCards = (count: number) => {
    return Array.from({ length: count }).map((_, idx) => <SkeletonCard key={idx} />);
};
