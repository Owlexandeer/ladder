import { Sprite } from '../components/Sprite';
import { Position } from '../components/Position';
import { Box } from '../components/Box';

export class PlatformNode {
    constructor(relativePosition, platformEntity) {
        this.relativePosition = relativePosition;
        this.platformEntity = platformEntity;
        this.prev = null;
        this.next = null;
    }
}

export class PlatformController {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.head = null;
        this.tail = null;
    }

    addPlatform(amount = 1) {
        let counter = 0;
        while (counter < amount) {
            // TODO: Use a consistent seed for this
            let relativePosition = Math.round(Math.random()) ? 1 : -1;
            let node = new PlatformNode(
                relativePosition,
                this.createPlatformEntity()
            );

            if (this.head == null && this.tail == null) {
                this.head = node;
                this.tail = this.head;
            } else {
                this.tail.next = node;
                this.tail = this.tail.next;
            }

            ++counter;
        }
    }

    removeBottomPlatform() {
        this.head = this.head.next;

        this.addPlatform();
    }

    getBottomPlatform() {
        return this.head;
    }

    createPlatformEntity() {
        // Create a platform
        let platform = this.entityManager.createEntity();
        // TODO: Create a constant for this
        platform.addTag('platform');

        platform.addComponent(Sprite);
        platform.addComponent(Position);
        platform.addComponent(Box);

        platform.sprite.setImage('platform.png');
        // TODO: Read these values from the image
        platform.box.setWidth(64);
        platform.box.setHeight(16);

        return platform;
    }
}
