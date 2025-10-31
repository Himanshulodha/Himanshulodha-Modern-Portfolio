import { iconProps } from "./iconsType";

export function MailIcon({size, extraClass, color}: iconProps){
    const brandColor = color === undefined ? "#EA4335" : color;
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-mail-icon lucide-mail ${size === undefined? 'size-4': size} ${extraClass}`}><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
}