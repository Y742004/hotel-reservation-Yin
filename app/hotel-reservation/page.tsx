"use client";

import { Button, Divider, Image, Input } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { m } from "framer-motion";
import { q } from "framer-motion/client";
import { useState } from "react";
import { DeleteReservation } from "./delete";
import { UpdateReservation } from "./update";
import MainData from "../Medical/mainData";

export default function Page() {
  const { isPending, error, data } = useQuery({
    queryKey: ["reservationData"],
    queryFn: () => fetch("/api/reservation").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const mutation = useMutation({
    mutationFn: (formData: {
      name: string;
      email: string;
      room: string;
      phoneNumber: string;
    }) => {
      return fetch("/api/reservation", {
        method: "POST",
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
    mutation.mutate({ name, email, room, phoneNumber });
  };
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="p-5">
<MainData/>

        <div className="p-8 border rounded-xl w-[500px] mx-auto">
          <Image src="https://www.scottsmorraphotography.com/images/xl/Lanikai-Beach-Sunrise-Palm-Trees-Oahu-Hawaii.jpg" />
          <form className="mt-5" onSubmit={onSubmit}>
            <div className=" flex flex-col gap-3 items-center w-[400px] mx-auto">
              <Input
                variant="bordered"
                isRequired
                labelPlacement="outside"
                label="Name"
                value={name}
                placeholder="Enter name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                variant="bordered"
                isRequired
                label="Email"
                labelPlacement="outside"
                value={email}
                placeholder="Enter email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                variant="bordered"
                isRequired
                label="Room"
                labelPlacement="outside"
                value={room}
                placeholder="Enter room"
                type="text"
                onChange={(e) => setRoom(e.target.value)}
              />
              <Input
                variant="bordered"
                isRequired
                label="Phone Number"
                labelPlacement="outside"
                value={phoneNumber}
                placeholder="Enter phone number"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className=" mt-10 w-[400px] mx-auto">
              <Button
                isLoading={mutation.isPending}
                isDisabled={mutation.isPending}
                className="bg-blue-500 text-white "
                type="submit"
                size="lg"
                fullWidth
              >
                Submit
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-2xl ">Hotel Reservation List</h1>
          <div className=" mt-5 grid lg:grid-cols-3 gap-2">
            {data.map((reservation: any) => (
              <div className="border p-3 max-w-96 rounded-lg ">
                
                <p>Name - {reservation.name} </p>
                <p>Email - {reservation.email} </p>
                <p>Room - {reservation.room} </p>
                <p>Phone Number - {reservation.phoneNumber} </p>
              <div className="flex gap-2 mt-5">
              <DeleteReservation id={reservation.id}/>
              <UpdateReservation id={reservation.id} oldName={reservation.name} oldEmail={reservation.email} oldRoom={reservation.room} oldPhoneNumber={reservation.phoneNumber} />
              </div>
               </div>

            
            ))}
             
          </div>
        </div>
      </div>
    </>
  );
}
