import { useState } from "react";
import { HoverCard } from "radix-ui";
import "../styles/project-link.css";

type Project = { name: string; icon: string; url: string; preview?: string; previewOptimized?: boolean };
let warmUntil = 0;
let activePreview = false;

export default function ProjectLink({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [failed, setFailed] = useState(false);
  const [delay, setDelay] = useState(180);
  const changeOpen = (next: boolean) => {
    setOpen(next);
    activePreview = next;
    if (next) warmUntil = Date.now() + 1000;
    else if (open) warmUntil = Date.now() + 400;
  };
  const host = new URL(project.url).hostname;
  return (
    <HoverCard.Root open={open} onOpenChange={changeOpen} openDelay={delay} closeDelay={125}>
      <HoverCard.Trigger asChild>
        <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer"
          onPointerEnter={(event) => {
            if (event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
            const warm = activePreview || Date.now() < warmUntil;
            setInstant(warm);
            setDelay(warm ? 0 : 180);
          }}
          onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) { setInstant(true); changeOpen(true); } else { event.preventDefault(); } }}
          onBlur={() => changeOpen(false)}
          onKeyDown={(event) => { if (event.key === "Escape") { setInstant(true); changeOpen(false); } }}
        >
          <span className="project-link-icon"><img src={project.icon} alt="" width="18" height="18" /></span>
          <span className="project-link-label">{project.name}</span>
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal forceMount>
        <HoverCard.Content forceMount side="top" sideOffset={12} collisionPadding={16}
          className="project-preview" data-instant={instant ? "true" : undefined}
          aria-hidden="true" onEscapeKeyDown={() => { setInstant(true); changeOpen(false); }}>
          {project.preview && !failed ? <img className="project-preview-image" src={project.preview} alt="" width="560" height="350" data-image-component={project.previewOptimized ? "true" : undefined} onError={() => setFailed(true)} /> :
            <div className="project-preview-fallback"><img src={project.icon} alt="" width="40" height="40" /><span>{project.name}</span><small>{host}</small></div>}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

