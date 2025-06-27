import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format price in Indonesian Rupiah format
 * @param price - The price to format
 * @returns Formatted price string with Rp prefix and dot thousand separators
 */
export function formatPrice(price: number | string): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `Rp${numPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;
}
