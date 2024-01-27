import { Review } from "@/models/Review";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface CardProps {
  review: Review;
}

const ReviewCard: FC<CardProps> = ({ review }) => {
  const { title, description, rating, location } = review;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        <p className="">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <p className="text-muted-foreground text-sm">{rating} of 10 Rating</p>
        <Link className="ml-auto" href={`/edit/${encodeURI(title)}`}>
          <Button variant={"ghost"}>Update</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
