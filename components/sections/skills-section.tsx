"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Code, Database, Wrench, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { portfolioData, type Skill } from "@/lib/portfolio-data"

const skillCategories = {
  frontend: { name: "Frontend", icon: Code, color: "from-blue-500 to-cyan-500" },
  backend: { name: "Backend", icon: Database, color: "from-green-500 to-emerald-500" },
  tools: { name: "Outils", icon: Wrench, color: "from-purple-500 to-pink-500" },
  other: { name: "Data Science", icon: Palette, color: "from-orange-500 to-red-500" },
}

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(
      () => {
        setProgress(skill.level)
      },
      index * 100 + 500,
    )

    return () => clearTimeout(timer)
  }, [skill.level, index])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </motion.div>
  )
}

export function SkillsSection() {
  const groupedSkills = portfolioData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">Compétences</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions web modernes et performantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => {
            const categoryInfo = skillCategories[category as keyof typeof skillCategories]
            const Icon = categoryInfo.icon

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xl font-playfair">{categoryInfo.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Langages", count: "7+" },
              { label: "Frameworks", count: "8+" },
              { label: "Outils", count: "11+" },
              { label: "Années d'exp.", count: "2+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
