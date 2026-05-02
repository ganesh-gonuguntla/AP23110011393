# Notification System Design - Stage 1

## Priority Logic
The system determines the priority of notifications based on two factors:
1.  **Type Weight**: 
    *   `Placement` (Weight: 3)
    *   `Result` (Weight: 2)
    *   `Event` (Weight: 1)
2.  **Recency**: Notifications with higher weights appear first. For notifications of the same type, the one with the most recent timestamp is prioritized.

## Efficient Top 'N' Maintenance
To maintain the top 10 (or top 'n') notifications efficiently as new notifications arrive, we can use a **Min-Heap** (Priority Queue) of size 10.

### Approach:
1.  **Incoming Stream**: For every new notification, calculate its priority score (Weight + Timestamp).
2.  **Heap Insertion**:
    *   If the heap has fewer than 10 elements, insert the new notification.
    *   If the heap is full, compare the new notification with the element at the top (the one with the *minimum* priority in our top 10).
    *   If the new notification has a *higher* priority than the min-element, remove the min-element and insert the new notification.
3.  **Complexity**: This ensures that we always have the top 10 notifications in $O(\log 10)$ per update, which is extremely efficient for real-time systems.

## Implementation Details
In the React application, the priority logic is implemented in `src/utils/priority.js`. It performs a sort and slice operation on the current set of notifications. For a production system with millions of notifications, this would be handled on the backend or using a more sophisticated data structure like the Min-Heap described above.

## Screenshtos
Screenshots of the priority notifications list are included in the walkthrough.
