
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NotificationCenter, User } from "@patterns/observer_pattern";


describe("observer_pattern", () => {
    vi.spyOn(console, 'log').mockImplementation(()=>{});

    it("should work", () => {
        const notificationCenter = new NotificationCenter();

        const user = new User("user");

        notificationCenter.subscribe(user);
        notificationCenter.notify(1);
        expect(console.log).toHaveBeenCalledWith("user received data: 1");
    })
       
})



