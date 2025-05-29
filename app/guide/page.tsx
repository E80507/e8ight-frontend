"use client";

import { Button } from "@/components/ui/button";

const GuidePage = () => {
  return (
    <>
      <p>CTA: dynamic button</p>
      <Button size="cta" shape="round">Label</Button>

      <p>CTA: dynamic full button</p>
      <Button size="cta" className="w-full" shape="round">Label</Button>

      <p>CTA: static button</p>
      <Button size="cta" variant="outline" shape="round" className="w-[200px]">Label</Button>

      <p>L button</p>
      <Button size="lg" shape="round">Label</Button>

      <p>M button</p>
      <Button size="md" shape="round">Label</Button>

      <p>Outline-A: L button</p>
      <Button size="lg" variant="outline" shape="round">Label</Button>

      <p>Outline-A: M button</p>
      <Button size="md" variant="outline" shape="round">Label</Button>
    </>
  );
}

export default GuidePage;