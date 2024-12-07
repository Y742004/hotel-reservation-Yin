"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export function UpdateReservation({
  id,
  oldName,
  oldEmail,
  oldRoom,
  oldPhoneNumber,
}: {
  id: string;
  oldName: string;
  oldEmail: string;
  oldRoom: string;
  oldPhoneNumber: string;
}) {
  const [room, setRoom] = useState(oldRoom);
  const [name, setName] = useState(oldName);
  const [email, setEmail] = useState(oldEmail);
  const [phoneNumber, setPhoneNumber] = useState(oldPhoneNumber);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string;
      room: string;
    }) => {
      return fetch("/api/reservation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservationData"] });
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ id, name, email, phoneNumber, room });
  };

  return (
    <>
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button color="primary">Edit</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={onSubmit}>
            <div className="px-1 py-2">
              <Input
                variant="bordered"
                isRequired
                label="Name"
                labelPlacement="outside"
                value={name}
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                variant="bordered"
                isRequired
                label="Email"
                labelPlacement="outside"
                value={email}
                placeholder="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                variant="bordered"
                isRequired
                label="Room"
                labelPlacement="outside"
                value={room}
                placeholder="Room"
                type="text"
                onChange={(e) => setRoom(e.target.value)}
              />

              <Input
                variant="bordered"
                isRequired
                label="Phone Number"
                labelPlacement="outside"
                value={phoneNumber}
                placeholder="Phone Number"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button type="submit">Done</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
