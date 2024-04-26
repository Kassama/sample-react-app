import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import { LuSalad } from "react-icons/lu";
import { GiHamburger } from "react-icons/gi"; 
import { GiSushis } from "react-icons/gi";
import { FoodData, getFoodData } from "../api/actions";

const FoodCard: React.FC = () => {
  const [data, setData] = useState<FoodData | undefined>();
  const [loadingState, setLoadingState] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Food Data...");
    console.log(foodType);
    setLoadingState(true);
    getFoodData(foodType)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    // <Card className="max-w-[400px]">
    // <Card className="max-w-[400px] bg-green-100">
    <Card className="max-w-[400px] bg-gradient-to-r from-green-400 via-green-500 to-green-600">

      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="foodname"
              type="text"
              label="Food"
              value={foodType}
              onChange={(e) => {
                setFoodType(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.type}</h1>
            {data.type === 'pizza' && <FaPizzaSlice className="w-36 h-36" />}
            {data.type === 'salad' && <LuSalad className="w-36 h-36" />}
            {data.type === 'burger' && <GiHamburger className="w-36 h-36" />}
            {data.type === 'sushi' && <GiSushis className="w-36 h-36" />}
            <h1 className="text-3xl font-bold">{data.type}</h1>
            <p className="text-xl">Size: {data.size}</p>
            <p className="text-lg">Toppings: {data.toppings.join(", ")}</p>
            <p className="text-lg">Calories: {data.calories}</p>
            <p className="text-lg">Price: {data.price}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a food type</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            // <p className="text-xs  text-white-600 ">Last update successful.</p>
            <p className="text-xs text-white">Last update successful.</p>
          )}
          {!data && (
            // <p className="text-xs  text-white-600 ">Waiting for input...</p>
            <p className="text-xs text-white">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
