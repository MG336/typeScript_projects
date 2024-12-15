// export{NotificationCenter, User};
// import { NotificationCenter, User } from "../../../src/projects/middle/design_patterns/observer_pattern";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { NotificationCenter, User } from "../../../test/middle/design_patterns/observer_pattern.ts";
// import { NotificationCenter, User } from "@/projects/middle/design_patterns/observer_pattern";
import { NotificationCenter, User } from "@patterns/observer_pattern";



// const notificationCenter = new NotificationCenter();
// const user1 = new User('user1');
// const user2 = new User('user2');
// const user3 = new User('user3');

// notificationCenter.subscribe(user1);
// notificationCenter.subscribe(user2);
// notificationCenter.subscribe(user3);

// notificationCenter.notify('update');

describe("observer_pattern", () => {
    vi.spyOn(console, 'log').mockImplementation(()=>{});

    it("should work", () => {
        const notificationCenter = new NotificationCenter();

        const user = new User("user");

        notificationCenter.subscribe(user);
        notificationCenter.notify(1);
        // console.log(`${this.name} получил данные: ${date}`);
        expect(console.log).toHaveBeenCalledWith("user получил данные: 1");
    })
       
})



