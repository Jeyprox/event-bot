import { Category, Event } from "@prisma/client";
import { format, formatRelative, startOfToday } from "date-fns";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const EventPreview = ({ event }: { event: Event & { category: Category } }) => {
  return (
    <Link href={`/events/${event.id}`}>
      <a className="w-full hover:bg-gray-800 px-4 py-2 rounded-md grid grid-cols-5 items-center duration-200">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold">{event.name}</h2>
          <p className="max-w-full truncate">{event.details}</p>
        </div>
        {event.category && (
          <div>
            <span
              style={{ backgroundColor: event.category.colour }}
              className="uppercase px-1.5 py-1 text-sm rounded"
            >
              {event.category.name}
            </span>
          </div>
        )}
        {event.date && (
          <span className="capitalize">
            {formatRelative(new Date(event.date), startOfToday())}
          </span>
        )}
        <button
          type="button"
          className="flex items-center justify-center gap-x-2 btn-primary"
        >
          <span className="font-semibold">More Info</span>
          <HiArrowRight />
        </button>
      </a>
    </Link>
  );
};

export default EventPreview;
