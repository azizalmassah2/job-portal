"use client";

import { useState } from "react";
import { Switch } from "../../../app/components/ui/switch";

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <span>الوضع الليلي</span>
      <Switch enabled={enabled} setEnabled={setEnabled} />
    </div>
  );
}
