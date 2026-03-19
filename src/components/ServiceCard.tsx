"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  ctaLabel: string;
}

/**
 * ServiceCard — a themed card component.
 * Demonstrates: Card, Badge, Button (outline), Sand theme card surface.
 *
 * Usage:
 *   <ServiceCard
 *     icon="🌿"
 *     title={t.about}
 *     description={t.description}
 *     badge="Popular"
 *     ctaLabel={t.learnMore}
 *   />
 */
export default function ServiceCard({
  icon,
  title,
  description,
  badge,
  ctaLabel,
}: ServiceCardProps) {
  return (
    <Card className="group relative flex flex-col overflow-hidden border border-border bg-card hover:shadow-md transition-shadow duration-200">
      {badge && (
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="text-xs font-medium">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-2xl">
          {icon}
        </div>
        <CardTitle className="font-heading text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="pt-4">
        <Button variant="outline" size="sm" className="w-full">
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
