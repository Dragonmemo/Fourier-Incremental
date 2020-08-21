# The script of the game goes in this file.
default CODE = ""
default HELP = 0
default InventoryG = []

define De = Character("Deror",color='00e700')
define R = Character("Ruvet",color='e0ec00')
define Da = Character("Dautime",color='00e0ec')
define G = Character("Grecemene",color='a05020')
define InterMark = Character("???", color='e0ec00')
define InterMark2 = Character("Tiger-like Creature", color='00e700')
# The game starts here.
image bg Nothingness1 = "bg/Nothingness1.png"
image bg Nothingness2 = "bg/Nothingness2.png"
image bg None = "bg/None.png"
image bg Soul = "bg/SoulWorld.png"
image bg livingF = "bg/livingF.jpg"
image bg BackgroundF = "bg/BackgroundF.jpg"
image Deror old_fight = "Deror/old_fight.png"
image Grecemene old_idle = "Grecemene/old_idle.png"
image Deror old_idle = "Deror/old_idle.png"
image RWolf fireball = "RWolf_fireball.png"

define audio.Fireball = "Fireball+3.mp3"
define audio.sword = "Swords.ogg"
define audio.Page = "Turning-Paper-Book-Page.mp3"



label start:
    "Please know and remember that in this game, \nAll your actions counts, \nEven your first presses"
    scene bg Nothingness1
    "Dev" "I want to know your name, your sex doesn't count inside the story."
    $ playername = renpy.input(_("Your Name:")) or _("the Player")
    $ playername = playername.strip()
    if playername == "":
        $ playername ="the Player"
    "Dev" "So your name is [playername]?"
    "Dev" "This place is called the Nothingness, I will soon fade away with this place to let you have control over the story."
    "Dev" "As a player, you will have the ability to help some characters make choices."
    "Dev" "You will be like the little voice in peoples heads, but like this one, you may not be listened."
    "Dev" "To help you have an impact on this world, I will lend you someone who is weak minded."
    "Dev" "You might use his environement to know more about this world."
    "Dev" "Now that you know all this, I can give you my place as a storyteller."
    jump debut
label debut:
    scene bg livingF with pixellate
    queue music "Windswept.ogg"
    show Grecemene old_idle:
        left
        zoom 0.5
    with fade
    "You wake up as a 19 years old boy who knows a lot about science."
    "Parents" "Grecemene! we might need mushrooms for tonight's meal.\nWould you go fetch them in the forest?"
    G "Well, i have nothing else to do, so i'm in."
    "{i}You can see a lot of books on a desk{\i}"
    jump D1Desk

label D1Desk:
    G "Should i continue study before going out?"
    menu:
        "Study magic":
            G "{i}I would really like to know how magic works... but if I do that i will be cursed.{\i}"
            G "{i}Also, I don't have any books that tell me how it works, all I know is that it exists{\i}"
            jump D1Desk
        "Study mythology":
            play sound Page
            G "{i}Yeah... mythology... it might be useless, but it's fun to see how history can became fantasy and fictionnal at times.{\i}"
            "1800 or so years ago, there was an angel that descended on the Earth.\n
            After seeing that humans were useless he casted a curse on humanity."
            "Since then, each and every human that tries to use magic or want to undermine somebody will take the shape of a beast."
            jump D1Desk
        "Study biology":
            play sound Page
            G "{i}Horrible experiences has given us some results but that might not be sufficiently precise to heal anyone...{\i}"
            "While understanding how muscles and nerves works alike our real world, there are some explanations on how the curse interract with the world"
            "It seems that those who are cursed can take back their human shape only if they are still consious.\n
            Killed beastmen (as they are sometimes called) do not take back their human shape after death."
            jump D1Desk
        "Prepare yourself":
            jump D1prepare
label D1prepare:
    G "{i}What should i take with me?\nA basket and... a cloak might suffice, I don't need to be overwhelmed by a shield.{\i}"
    G "{i}Now i'm ready to go outside.{\i}"
    jump D1forest

label D1forest:
    scene bg BackgroundF with pixellate
    stop music
    play music "Folk Round.ogg"
    "Later, the same day, you take a stroll on the forest and search out for mushrooms."
    "You continue to walk until you find some."
    show Grecemene old_idle:
        left
        zoom 0.5
    with None
    G "{i}I found those 'shrooms! let's go home now{\i}"
    "You start to go home confidently, but you felt someone was watching you from behind."
    "You just heard a branch craking behind you."
    menu:
        "Look if there is something behind you":
            jump confrontation

label confrontation:
    show Deror old_fight:
        right
        zoom 0.5
    with moveinright
    stop music
    play music "Satiate.ogg"
    "You encountered a beast that looks like a tiger!"
    G "No! I don't want to die now!"
    "Beast" "Look what i just found, a new pray!"
    "You fall to the ground after being pushed by the beast"
    "Grecemene closes his eyes because of the fear"
    scene bg None with fade
    menu :
        "think of something you forgot to take with you":
            jump shielding

label shielding:
    G "{i}I should have took the shield before searching mushrooms!{\i}"
    "Grecemene protects himself with his forearm.\nThe last thing you saw is a claw that is coming right to your head."
    stop music
    "And..."
    play audio sword
    "You feel a slight jolt on your forearm"
    play music "Folk Round.ogg"
    G "What happened?"
    menu:
        "open your eyes":
            scene bg BackgroundF
            "You see the tiger lying on a tree.\nThe bark seems to have broke from a powerful hit."
            menu:
                "Stay here":
                    jump Keeper


label Keeper:
    "You somehow feel guilty but stronger and stay by the side of the creature"
    "After minutes, he wakes up, taking back his human shape."
    "???" "What hap-"
    "He looks at you and run away, shocked"
    stop music
    play music "Anguish.ogg"
    G "I should head back home..."
    "You see him taking back the basket and getting out of the forest."
    jump D1Home

label D1Home:
    scene bg livingF with fade
    "Once back home, Grecemene left the mushrooms in the kitchen and get to his room, to think about what happened."
    G "{i}What just happened... I should have died, killed by this beast."
    G "{i}Was it what other called magic?\nBut if it is, why haven't I shapeshifted?{\i}"
    G "{i}I should stop thinking about that... I might become crazy.{\i}"
    jump D2Home

label D2Home:
    stop music
    play music "Windswept.ogg"
    show Grecemene old_idle:
        left
        zoom 0.5
    with moveinleft
    "On the following morning, Grecemenes decides to go back to the forest.\nBut before that, he is still at home :"
    jump D2Desk
label D2Desk:
    "Books haven't changed in one day, but you better be checking"
    menu:
        "Study magic":
            G "{i}Was that really magic? But if it was, I should have been cursed.{\i}"
            G "{i}I want to have books that tell me how it works...{\i}"
            InterMark "{i}So why don't you go fetch some?{\i}"
            G "{i}Was it my imagination or did someone talked to me?{\i}"
            jump D2Desk
        "Study mythology":
            play sound Page
            G "{i}Yeah... mythology... it might be useless, but it's fun to see how history can became fantasy and fictionnal at times.{\i}"
            "1800 or so years ago, there was an angel that descended on the Earth.\n
            After seeing that humans were useless he casted a curse on humanity."
            InterMark "{i}Interresting and funny indeed.{\i}"
            "Since then, each and every human that tries to use magic or want to undermine somebody will take the shape of a beast."
            G "{i}I think i heard someone...{\i}"
            jump D2Desk
        "Study biology":
            play sound Page
            G "{i}Horrible experiences has given us some results but that might not be sufficiently precise to heal anyone...{\i}"
            InterMark "{i}I've seen worse.{\i}"
            G "{i}Is there someone here?{\i}"
            "While understanding how muscles and nerves works alike our real world, there are some explanations on how the curse interract with the world"
            "It seems that those who are cursed can take back their human shape only if they are still consious.\n
            Killed beastmen (as they are sometimes called) do not take back their human shape after death."
            jump D2Desk
        "Get out":
            "Grecemene takes a cloak and get outside, more confident than ever."
            jump D2Forest

label D2Forest:
    scene bg BackgroundF
    show Grecemene old_idle:
        left
        zoom 0.5
    with pixellate
    "Upon your arrival, you hear some voices and Grecemene decides to hide under bushes."
    stop music
    play music "Satiate.ogg"
    "???" "Well, the burning blizzard isn't what he were anymore, you look pretty weak right now!"
    G "{i}Who are those? Maybe I should look for a second?{\i}"
    "Grecemene tries to look over the bushes"
    show Deror old_idle:
        center
        zoom 0.5
    show RWolf fireball:
        right
        zoom 0.5
    with None
    G "{i}That's the beastman who attacked me yesterday!{\i}"
    "Wolf-like Creature" "You even look like you will fall to the ground at any moment!"
    G "{i}Is that a fireball in his hand... If he launches it against the tiger...!{\i}"
    G "The forest will burn!"
    "Wolf-like Creature" "Oh, it seems like we have a little spy here!\nIf you fear that i'll burn down the forest, don't worry much, I will start with you!"
    InterMark2 "Move out!"
    hide Deror
    hide RWolf fireball
    show Deror old_idle:
        center
        zoom 0.5
        ease 5.0 left
    show fireball:
        right
        zoom 0.5
        ease 5.0 left
    with None
    pause 3.0
    scene bg None
    G "{i}I... I can't move!{\i}"
    "He closed his eyes due to the fear"
    play audio Fireball
    pause 2.0
    G "{i}will I die?{\i}"
    G "{i}How long has it been, I haven't felt anything yet... should I open my eyes?{\i}"
    scene bg BackgroundF
    show Grecemene old_idle:
        left
        zoom 0.5
    show Deror Arm_burnt:
        center
        zoom 0.5
    show RWolf Normal:
        right
        zoom 0.5
    show FoxFigure:
        right
    G "You... you protected me... why?"
    InterMark2 "Hey kiddo! If you want to stay alive, I think you should do the trick you did to me yesterday!"
    InterMark2 "I know myself and I can't face them alone like that"
    G "{i}I can't stay here or I'll die for sure!{\i}"
    hide RWolf
    hide FoxFigure
    hide Deror
    show Deror Arm_burnt:
        center
        zoom 0.5
        ease 1.0 right
    hide Grecemene
    show Grecemene old_idle:
        left
        xzoom -0.5
        yzoom 0.5
        ease 1.0 center
    with None
    hide Deror
    G "{i}I think I'm out of danger for now{\i}"
    show RWolf Normal:
        left
        zoom 0.5
    "Wolf-like Creature" "Don't think you will flee that easily!"
    show fireball:
        left
        zoom 0.5
        ease 1.0 right
    show Grecemene old_idle:
        center
        xzoom -0.5
        yzoom 0.5
        linear 0.5 yalign 2.0
        linear 0.5 yalign 1.0
    with None
    G "Oh no! I have to stop the tree from burning!"
    play audio Fireball
    hide fireball
    show Vapor at right
    "Both" "What happened?!"
    G "{i}Did I do that?{\i}"
    hide Vapor
    "Wolf-like Creature" "I won't let you flee, you are my prey!"
    G "{i}Think... think... Oh! I have an idea!{\i}"
    show Grecemene old_idle:
        center
    show Deror Arm_burnt :
        offscreenright
        zoom 0.5
        linear 0.5 right
    show FoxFigure at offscreenright
    show fireball at left
    with None
    G "If you trust me, let him jump onto you!"
    show Grecemene old_idle:
        center
        linear 0.5 yalign 2.0
        linear 0.5 yalign 1.0
    show Deror Arm_burnt:
        right
        linear 1.0 yalign 2.0
    show FoxFigure:
        offscreenright
        linear 1.0 right
    show fireball:
        left
        linear 1.0 right
    with None
    pause 1.0
    play audio Fireball
    show FoxFigure:
        right
        linear 0.5 xalign 2.0
    with None
    "Fox-like Creature" "{i}Squeak!{\i}"
    hide FoxFigure
    "Wolf-like Creature" "We will fight another day the burning blizzard, you won't be this lucky!"
    show RWolf Normal:
        left
        linear 0.5 xalign -1.0
    with None
    InterMark2 "I think we are safe no- AOUCH!"
    hide RWolf
    G "Oh! you're still burnt! let me help you, I know the basics in medicine"
    hide Deror
    show Deror Bandaged at right
    G "If only I could wet them somehow"
    play audio Splash
    hide Deror
    show Deror BandagedWet at right
    "Both" "Wh- what?"
    InterMark2 "Listen up kiddo, I owe you my life for that, and i don't know how you did those spell, but that was impressive."
    G "I also owe you my life for saving me back then from that fireball."
    hide Grecemene
    show Grecemene wondering
    InterMark2 "I see that something is bothering you"
    G "Yeah, you told me I did a spell, but I don't know how..."
    G "How does that even work? what enable us to do this, why didn't I shapeshifted, what are the limits of it?"
    InterMark2 "Woah woah, calm down kiddo. I know that there could be answers at Rovias"
    G "Rovias? The country's main library?"
    InterMark2 "Yeah, if there is no answer for you there, there might be none anywhere."
    G "But... I can't travel all the way there alone.. it's too far and dangerous..."
    InterMark2 "Listen kiddo, if you trust me... I can bring you there, I'll help you defend along the way."
    G "..."
    Intermark2 "If you don't want to do that I'll go. Show up tomorrow on the forest's pathway if you want to go, if I don't see you I'll go away."
    G "Ok... thanks"
    scene bg None
    "Day 3"
    jump D3Home

label D3Home:
    stop music
    play music "Windswept.ogg"
    scene bg livingF with fade
    show Grecemene old_idle:
        left
        zoom 0.5
    G "{i}I have to go, I want to know what is going on with me{\i}"
    G "So... I packed up a notebook, clothes, a blanket and some changes."
    jump D3ForestBeginning

label D3ForestBeginning:
    scene bg BackgroundF
    show Grecemene old_idle:
        left
        zoom 0.5
    show Deror old_idle:
        right
        zoom 0.5
    with pixellate
    G "Hey ! I'm here!"
    InterMark2 "I thought you would have given up"
    "..."
    jump credit

label action1:
    $ activity = renpy.input(_("everything should be written in lowercase characters")) or _("")
    $ activity = activity.strip()
    if activity == "reset":
        jump finale
    elif activity == "help":
        $ HELP += 1
        G "Oh, you really think you need help? I'll not be the one giving you any help"
        if HELP == 1:
            "But i will.\nYou will have to look out for underlined text now."
        else:
            "Now, you will have to look out for underlined text.\nThere also might be a file to record your actions that you can modify too! (not implemented yet)"
        G "Whatever, there is nothing else you can do except {u}reset{/u}ing."
        jump action1
    elif activity == "act":
        G "what do you want to do?"
        G "You know, this will go nowhere."
        "Dev" "This will really go nowhere because this is a demo and hints come before this time.\nSo... Goodbye!"
        return
    else :
        if HELP == 0:
            G "Oh, you don't know what to do? if only someone was here to {u}help{/u} you."
        else :
            G "There is nothing else you can do except {u}reset{/u}ing."
        jump action1

label credit:
    stop music
    play music "Folk Round.ogg"
    scene bg None with fade
    "Rolan" "It's pretty dark here, wait a minute, I'll lighten up the ambiance!"
    show fireball :
        truecenter with None
        linear 2.0 zoom 2.0
    "..."
    scene bg Soul with fade
    De "You shouldn't be here!"
    "Rolan" "Oopsie! Maybe I will appear in a future update or else?\nAnyway, go have some fun watching the credit!"
    "Developper" "Hope you loved playing this VN demo!"
    "Developper" "Now i might be working onto learning C# or artworks."
    "Developper" "Stay tuned with my twitter account ! (@Dragonmemo3)"
    "Royalty free sound effect from https://www.fesliyanstudios.com"
    "Musics by Kevin McLeod"
    return
