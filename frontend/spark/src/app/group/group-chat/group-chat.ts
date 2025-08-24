import {Component} from '@angular/core';

@Component({
  selector: 'app-group-chat',
  imports: [],
  templateUrl: './group-chat.html',
  styleUrl: './group-chat.scss'
})
export class GroupChat {
 obj = {
  "chatName": "Sunday Joggers",
   "profilePicture": "http://localhost:3000/images/discovery/disco1",
  "messages": [
    {
      "id": 1,
      "sender": "Alice",
      "type": "text",
      "content": "Good morning team! Ready for the jog?",
      "timestamp": "2025-08-24T07:30:00Z"
    },
    {
      "id": 2,
      "sender": "System",
      "type": "text",
      "content": "Bob joined the chat",
      "timestamp": "2025-08-24T07:32:00Z"
    },
    {
      "id": 3,
      "sender": "Bob",
      "type": "text",
      "content": "Morning! The weather looks perfect today 🌤️",
      "timestamp": "2025-08-24T07:33:00Z"
    },
    {
      "id": 4,
      "sender": "Charlie",
      "type": "image",
      "url": "https://example.com/photos/trail_start.jpg",
      "caption": "Trailhead looks clear!",
      "sparks": 5,
      "timestamp": "2025-08-24T07:35:00Z"
    },
    {
      "id": 5,
      "sender": "Dana",
      "type": "text",
      "content": "Let's meet at the park entrance in 15 minutes.",
      "timestamp": "2025-08-24T07:36:00Z"
    },
    {
      "id": 6,
      "sender": "Alice",
      "type": "image",
      "url": "https://example.com/photos/group_selfie.jpg",
      "caption": "Post-jog victory selfie 🏃‍♂️🏃‍♀️✨",
      "sparks": 12,
      "timestamp": "2025-08-24T09:00:00Z"
    }
  ]
}

}
