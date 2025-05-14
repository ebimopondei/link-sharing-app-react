import { PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export default function useDndKit () {

    const sensors = useSensors(
            useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 }}),
            useSensor(PointerSensor)
    );

    return {
        sensors
    }
}