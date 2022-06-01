import { Menu, Transition } from "@headlessui/react";
import {
  add,
  eachDayOfInterval,
  endOfISOWeek,
  endOfMonth,
  format,
  getISODay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfISOWeek,
  startOfToday,
} from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
  useController,
  UseControllerProps,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  HiCheck,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { Category } from "../../interfaces";

type FormData = {
  name: string;
  details: string;
  start: Date;
  duration: number;
  category: Category;
};

const classNames = (...classes: any) => classes.filter(Boolean).join(" ");

const Calendar = (props: UseControllerProps<FormData>) => {
  const { field } = useController(props);

  let today = startOfToday();
  let [seletedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let newDays = eachDayOfInterval({
    start: startOfISOWeek(firstDayCurrentMonth),
    end: endOfISOWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const changeMonth = (amount: number) => {
    setCurrentMonth(
      format(add(firstDayCurrentMonth, { months: amount }), "MMM-yyyy")
    );
  };

  return (
    <div className="px-4 py-2 grid gap-y-8 text-center">
      <div className="flex justify-between items-center">
        {/* current month */}
        <h2 className="text-lg font-semibold">
          {format(firstDayCurrentMonth, "MMM yyyy")}
        </h2>
        {/* switch months */}
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="p-1.5 hover:bg-gray-700 rounded duration-200"
          >
            <span className="sr-only">Previous Month</span>
            <HiChevronLeft className="grid place-content-center w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="p-1.5 hover:bg-gray-700 rounded duration-200"
          >
            <span className="sr-only">Next Month</span>
            <HiChevronRight className="grid place-content-center w-6 h-6" />
          </button>
        </div>
      </div>
      {/* calendar interface */}
      <div className="grid gap-y-4 text-sm">
        {/* day labels */}
        <div className="grid grid-cols-7 text-gray-300">
          <h3>M</h3>
          <h3>T</h3>
          <h3>W</h3>
          <h3>T</h3>
          <h3>F</h3>
          <h3>S</h3>
          <h3>S</h3>
        </div>
        {/* list of days */}
        <div className="grid grid-cols-7 gap-y-2 text-gray-100">
          {newDays.map((day, i) => (
            <div
              key={day.toString()}
              className={classNames(
                "text-center",
                i === 0 && colStartClasses[getISODay(day) - 1]
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(day), field.onChange(day);
                }}
                className={classNames(
                  isEqual(day, seletedDay) &&
                    isToday(day) &&
                    "text-gray-100 bg-indigo-400 hover:bg-indigo-500",
                  isEqual(day, seletedDay) &&
                    !isToday(day) &&
                    "bg-gray-200 text-gray-800 font-bold",
                  isToday(day) && "text-indigo-400 font-bold",
                  !isSameMonth(day, firstDayCurrentMonth) && "text-gray-400",
                  !isEqual(day, seletedDay) && "hover:bg-gray-700",
                  "mx-auto grid place-content-center rounded w-10 aspect-square duration-200"
                )}
              >
                <time dateTime={format(day, "dd/MM/yyyy")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreateEvent = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      start: startOfToday(),
    },
    mode: "onChange",
  });

  register("start", { required: true });

  const eventDay = useWatch({
    control,
    name: "start",
  });

  const detailText = useWatch({
    control,
    name: "details",
    defaultValue: "",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="mx-auto max-w-4xl grid gap-y-8">
      <div className="grid gap-y-2">
        <div className="flex items-center gap-x-4">
          <Image
            src="/img/icons/add.svg"
            alt="add-icon"
            width={32}
            height={32}
            layout="fixed"
          />
          <h1 className="text-2xl font-semibold">Create Event</h1>
        </div>
        <p className="text-gray-300">
          Bring your events to life by announcing them to all the servers in
          your category
        </p>
      </div>
      <form
        className="grid grid-cols-2 gap-8 text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="input"
          placeholder="Event Name"
          {...register("name", { required: true, maxLength: 32 })}
        />
        <div className="flex justify-between items-center bg-gray-800 border border-gray-700 px-4 py-2 rounded">
          {sessionStatus === "loading" && (
            <div className="w-8 aspect-square rounded-full bg-gray-800 animate-pulse"></div>
          )}
          {sessionStatus === "authenticated" && session?.user && (
            <div className="flex items-center gap-x-4">
              <Image
                className="rounded-full"
                src={String(session.user.image)}
                alt="avatar"
                width={32}
                height={32}
                layout="fixed"
              />
              <h3 className="text-lg font-semibold">{session.user.name}</h3>
            </div>
          )}
          <HiCheck className="text-indigo-400 text-xl" />
        </div>
        <div className="relative col-span-2">
          <textarea
            className="w-full input text-base h-24 max-h-64"
            {...register("details", { required: true })}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-base text-gray-300">
            {detailText.length}/256
          </span>
        </div>
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className={classNames(
                  "z-10 w-full flex justify-between border border-gray-700 items-center hover:bg-gray-800 py-2 px-4 rounded duration-200",
                  open && "bg-gray-800"
                )}
              >
                <span>{format(eventDay, "dd/MM/yyyy")}</span>
                <HiChevronDown className="text-xl" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="duration-300"
                enterFrom="-translate-y-2 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="duration-300"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-2 opacity-0"
              >
                <Menu.Items className="w-full mt-2 absolute bg-gray-800 rounded">
                  <Menu.Item>
                    <Calendar
                      control={control}
                      name="start"
                      rules={{ required: true }}
                    />
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
        <input
          className="input"
          type="range"
          {...register("duration", { required: true })}
        />
        <select
          className="input col-span-2"
          {...register("category", { required: true })}
        >
          <option value="">Select a category</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </select>
        <button
          type="submit"
          name="Create Event"
          className="col-span-2 mx-auto btn-primary w-48"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

let colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default CreateEvent;
