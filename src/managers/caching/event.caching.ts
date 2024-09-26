import { Event } from '../../types/event.types';
import { EventRepository } from '../../repository/event.repository';

export class EventCaching {

    private static instance: EventCaching | null = null;
    private static eventById: Map<number, Event> = new Map();
    private static readonly repository: EventRepository = new EventRepository();
    
    public static getInstance(): EventCaching {

        if(!EventCaching.instance) {
            EventCaching.instance = new EventCaching();
        }

        return EventCaching.instance;
    }

    public async findEvent(event: Event): Promise<Event> {
        
        if (EventCaching.eventById.has(event.id)) {
            return EventCaching.eventById.get(event.id)!;
        }

        return this.saveEvent(event);
    }

    public clear() {
        EventCaching.eventById.clear();
        EventCaching.instance = null;
    }
    
    private async saveEvent(event: Event): Promise<Event> {
        
        const newEvent: Event = await EventCaching.repository.create(event);
        EventCaching.eventById.set(newEvent.id, newEvent);
        
        return newEvent; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const events: Event[] = await EventCaching.repository.findAll();
        events.map(event => {
            EventCaching.eventById.set(event.id, event);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}