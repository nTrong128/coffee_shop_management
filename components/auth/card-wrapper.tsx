"use client";

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {BackButton} from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLink: string;
}

export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonLink}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonLink} />
      </CardFooter>
    </Card>
  );
};
