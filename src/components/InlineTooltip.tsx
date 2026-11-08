import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

type Props = {
  href: string;
  label: string;
  icon: string;
  text?: string;
  className?: string;
};

export default function InlineTooltip({ href, label, icon, text, className = "tool" }: Props) {
  return (
    <TooltipProvider delayDuration={350} skipDelayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={text ? `${text} ${label}` : label}>
            <img src={icon} alt="" width={className === "tool" ? 19 : 20} height={className === "tool" ? 19 : 20} />
            {text && <span>{text}</span>}
          </a>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
