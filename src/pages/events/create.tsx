import { Disclosure, Listbox, Menu, Transition } from "@headlessui/react";
import {
  add,
  addDays,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfISOWeek,
  endOfMonth,
  endOfToday,
  format,
  getISODay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  set,
  startOfISOWeek,
  startOfToday,
} from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useController, UseControllerProps, useForm } from "react-hook-form";
import {
  HiCheck,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { Category } from "../../interfaces";
import useSWRImmutable from "swr/immutable";
import ErrorMessage from "../../components/ErrorMessage";

type FormData = {
  event_name: string;
  details: string;
  start: Date;
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
          {Array.from(Array(7)).map((e, i) => (
            <h3 key={i}>
              {format(addDays(startOfISOWeek(today), i), "EEEEE")}
            </h3>
          ))}
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
                value={day.toISOString()}
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
                  !isEqual(day, seletedDay) &&
                    isToday(day) &&
                    "text-indigo-400 font-bold",
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
  const { data: categoryList, error: categoryError } = useSWRImmutable(
    () => "/api/events/categoryList"
  );

  const { register, handleSubmit, control, setValue, watch } =
    useForm<FormData>({
      defaultValues: {
        details: "",
        start: add(startOfToday(), { hours: new Date().getHours() }),
        category: {},
      },
      mode: "onChange",
    });

  register("start", { required: true });
  register("category", { required: true });

  const liveFields = watch();

  const getStartDate = (value: string) => {
    let startTime = parse(value, "HH:mm", new Date());
    return set(liveFields.start, {
      hours: startTime.getHours(),
      minutes: startTime.getMinutes(),
    });
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  if (categoryError) return <ErrorMessage errorMessage={categoryError} />;

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
      <Disclosure as="div" className="relative">
        <Disclosure.Button className="w-full text-lg border border-gray-700 font-semibold text-gray-300 bg-gray-800 px-4 py-2 rounded flex justify-between items-center">
          <span>Show Preview</span>
          <HiChevronDown className="text-xl" />
        </Disclosure.Button>
        <Transition
          as={Fragment}
          enter="duration-300"
          enterFrom="-translate-y-2 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="duration-300"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="-translate-y-2 opacity-0"
        >
          <Disclosure.Panel className="absolute mt-2 z-10 w-full shadow">
            <div className="bg-gray-800 flex items-start gap-x-4 p-4 rounded">
              <div className="grid place-content-center h-12 w-12 bg-gray-700 rounded-full">
                <Image
                  src="/img/icons/calendar.svg"
                  alt="bot-image"
                  width={30}
                  height={30}
                  layout="fixed"
                />
              </div>
              <div className="grid gap-y-1">
                <div className="flex items-center gap-x-1.5">
                  <h2 className="font-semibold">EventBot</h2>
                  <span className="bg-blue-500 text-xs px-1 rounded font-semibold">
                    BOT
                  </span>
                  <p className="text-sm text-gray-400">
                    Today at {format(new Date(), "HH:mm")}
                  </p>
                </div>
                <div className="w-[24rem] relative grid gap-y-2 bg-gray-900 pl-5 px-4 py-2 rounded">
                  <span className="absolute w-1 h-full bg-indigo-500 rounded-l"></span>
                  <div className="flex items-center gap-x-2">
                    {session?.user ? (
                      <Image
                        src={String(session?.user?.image)}
                        alt="user-icon"
                        width={24}
                        height={24}
                        layout="fixed"
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-6 aspect-square rounded-full bg-gray-700 animate-pulse"></div>
                    )}
                    <p className="text-sm font-semibold">
                      {session?.user?.name}
                    </p>
                  </div>
                  <div className="grid gap-y-2">
                    <div>
                      <h2 className="font-semibold">{liveFields.event_name}</h2>
                      <p className="text-sm w-full break-all text-gray-300">
                        {liveFields.details}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">Start Date</h2>
                      <p className="text-sm text-gray-300">
                        {format(liveFields.start, "HH:mm - dd/MM/yyyy")}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">Event Link</h2>
                      <a
                        href={`https://event-bot.vercel.app/events/${encodeURI(
                          liveFields.event_name
                        )}`}
                        className="text-sm text-gray-300"
                      >
                        https://event-bot.vercel.app/events/
                        {encodeURI(liveFields.event_name)}
                      </a>
                    </div>
                    <p className="text-xs text-gray-300 font-semibold">
                      {liveFields.category?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
      <form
        className="grid grid-cols-2 gap-8 text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="form-input input text-lg"
          placeholder="Event Name"
          {...register("event_name", { required: true, maxLength: 32 })}
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
            maxLength={512}
            className="form-input resize-none text-base max-w-full break-words w-full input h-64"
            {...register("details", { required: true })}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-base text-gray-300">
            {liveFields.details?.length}/512
          </span>
        </div>
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className={classNames(
                  "input-dropdown",
                  open && "bg-gray-800 ring-2"
                )}
              >
                <span>{format(liveFields.start, "dd/MM/yyyy")}</span>
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
                <Menu.Items className="z-10 w-full mt-2 absolute bg-gray-800 rounded">
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
        <Listbox
          name="category"
          as="div"
          className="relative"
          value={format(liveFields.start, "HH:mm")}
          onChange={(value) => setValue("start", getStartDate(value))}
        >
          {({ open }) => (
            <>
              <Listbox.Button
                className={classNames(
                  "input-dropdown",
                  open && "bg-gray-800 ring-2"
                )}
              >
                <span>{format(liveFields.start, "HH:mm")}</span>
                <HiChevronDown className="text-xl" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                enter="duration-300"
                enterFrom="-translate-y-2 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="duration-300"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-2 opacity-0"
              >
                <Listbox.Options className="scrollbar absolute mt-2 w-full text-center max-h-64 overflow-x-hidden overflow-y-scroll bg-gray-800 rounded p-2 grid gap-y-1">
                  {eachHourOfInterval({
                    start: startOfToday(),
                    end: endOfToday(),
                  }).map((time) => (
                    <Listbox.Option
                      className={classNames(
                        "cursor-pointer rounded py-1.5  duration-200",
                        format(liveFields.start, "HH:mm") ===
                          format(time, "HH:mm")
                          ? "bg-indigo-400 hover:bg-indigo-500"
                          : "hover:bg-gray-700"
                      )}
                      key={format(time, "HH:mm")}
                      value={format(time, "HH:mm")}
                    >
                      {format(time, "HH:mm")}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
        {!categoryList ? (
          <div className="w-full h-12 bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <Listbox
            as="div"
            className="relative"
            value={liveFields.category}
            onChange={(value) => setValue("category", value)}
          >
            {({ open }) => (
              <>
                <Listbox.Button
                  className={classNames(
                    "input-dropdown",
                    open && "bg-gray-800 ring-2"
                  )}
                >
                  <span>{liveFields.category.name || "Select a category"}</span>
                  <HiChevronDown className="text-xl" />
                </Listbox.Button>
                <Listbox.Options className="scrollbar absolute mt-2 w-full text-center max-h-64 overflow-x-hidden overflow-y-auto bg-gray-800 rounded p-2 grid gap-y-1">
                  {categoryList.map((category: Category) => (
                    <Listbox.Option
                      className={classNames(
                        "cursor-pointer rounded py-1.5 duration-200 hover:bg-gray-700",
                        liveFields.category.id === category.id &&
                          "bg-indigo-400 hover:bg-indigo-500"
                      )}
                      key={category.id}
                      value={category}
                    >
                      {category.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </>
            )}
          </Listbox>
        )}
        <button
          type="submit"
          name="Create Event"
          className="col-span-2 mx-auto btn-primary w-64"
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
