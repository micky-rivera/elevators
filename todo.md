
main OTIS logic:
- when a call is made, system checks which elevator is closest and chooses that one UNLESS:
    - direction is wrong
    - maybe other stuff idk yet

todo:

- each floor should have a corresponding y position value. This should be given to the elevators

- elevator class should have a function move() where it determines:
    - am I at destination floor? If not, move towards that floor's corresponding y position
