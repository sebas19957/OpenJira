interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string
    status: string
    createAt: number
}

export const seedData: SeedData = {
    entries: [
        {
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam eaque doloribus eos incidunt dolore explicabo.",
          status: "pending",
          createAt: Date.now(),
        },
        {
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in distinctio hic.",
          status: "in-progress",
          createAt: Date.now() - 1000000,
        },
        {
          description:
            "Quaerat minus cupiditate rerum dolorum odit veniam! Autem, delectus, earum, ullam dolor voluptates tenetur asperiores veritatis excepturi officiis fuga necessitatibus minus maiores.",
          status: "finished",
          createAt: Date.now() - 100000,
        },
      ],
}