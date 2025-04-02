"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  const isSubPage = segments.length > 0;
  const currentPage = segments[segments.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
        </BreadcrumbItem>

        {isSubPage && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
