import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Book, Heart, Calendar, Clock, Bell, User } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const BabyPrep = () => {
  const { toast } = useToast();

  const handleSaveReminder = (item: string) => {
    toast({
      title: "Reminder saved",
      description: `Added "${item}" to your preparations checklist.`,
      duration: 3000
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
      duration: 3000
    });
  };

  const tabs = [
    { id: 'islamic-traditions', label: 'Islamic Traditions', icon: Book },
    { id: 'before-birth', label: 'Before Birth', icon: Heart },
    { id: 'after-birth', label: 'After Birth', icon: Baby },
    { id: 'financial', label: 'Financial', icon: Heart },
    { id: 'checklist', label: 'Checklist', icon: Calendar },
    { id: 'journal', label: 'My Notes', icon: Book },
  ];

  const [activeTab, setActiveTab] = React.useState('islamic-traditions');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-green py-8 sm:py-12">
          <div className="container-app text-center">
            <Baby className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-islamic-gold" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Preparing for Your Baby's Arrival</h1>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto text-islamic-sand">
              Islamic traditions and practices to welcome your newborn with faith and love
            </p>
          </div>
        </section>

        {/* Main Content with Tabs */}
        <section className="py-6 sm:py-12 bg-islamic-cream">
          <div className="container-app">
            <div className="space-y-4 sm:space-y-6">
              {/* Tab Navigation */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4 sm:space-y-6">
                {activeTab === 'islamic-traditions' && (
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                    <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-3">
                      <Book className="h-5 w-5 text-islamic-teal" />
                    </div>
                      <CardTitle className="text-xl sm:text-2xl">Key Islamic Traditions for Newborns</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                      Beautiful practices from the Sunnah to welcome your child
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Adhan in the Right Ear</h3>
                      <p>
                        It is from the Sunnah to recite the Adhan (call to prayer) in the right ear of the newborn. The Prophet Muhammad (peace be upon him) did this for his grandson. This beautiful practice ensures that the first words a child hears are the proclamation of Allah's greatness.
                      </p>
                      <p className="text-sm italic text-gray-600 mt-2">
                        "Abu Rafi' said: I saw the Messenger of Allah (peace be upon him) giving the adhan for prayer in the ear of Al-Hasan bin Ali when he was born to Fatimah." (Tirmidhi)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Tahneek (Date in the Mouth)</h3>
                      <p>
                        Tahneek involves softening a small piece of date in your mouth and then gently placing it on the baby's palate. This tradition was practiced by the Prophet Muhammad (peace be upon him) for newborns brought to him.
                      </p>
                      <p className="text-sm italic text-gray-600 mt-2">
                        "I took Abdullah ibn Az-Zubair to the Prophet (peace be upon him) when he was born. The Prophet (peace be upon him) took him, placed him on his lap, called for a date, chewed it, and put it in the child's mouth." (Bukhari)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Aqeeqah (Celebration Sacrifice)</h3>
                      <p>
                        Aqeeqah is the sacrifice of animals (two sheep for a boy, one for a girl) as gratitude to Allah for blessing the parents with a child. This is typically done on the seventh day after birth, along with naming the child and shaving the baby's head.
                      </p>
                      <p className="text-sm italic text-gray-600 mt-2">
                        "For a boy, two sheep of equal age, and for a girl one sheep." (Ahmad)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Circumcision (Khitan)</h3>
                      <p>
                        Male circumcision is an important Islamic practice and is considered part of the fitrah (natural disposition). While there's no specific time mandated, many parents choose to have it done when the baby is young.
                      </p>
                      <p className="text-sm italic text-gray-600 mt-2">
                        "Five practices are characteristics of the fitrah: circumcision, shaving the pubic hair, cutting the mustaches short, clipping the nails, and depilating the hair of the armpits." (Bukhari)
                      </p>
                    </div>
                  </CardContent>
                </Card>
                )}
              
                {activeTab === 'before-birth' && (
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                    <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-3">
                      <Heart className="h-5 w-5 text-islamic-teal" />
                    </div>
                      <CardTitle className="text-xl sm:text-2xl">Preparing During Pregnancy</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                      Islamic guidance for fathers during pregnancy
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Spiritual Preparation</h3>
                      <p>
                        Make dua (supplication) regularly for the health of your wife and baby. Recite Surah Maryam and other relevant surahs, which speak about pregnancy and childbirth.
                      </p>
                      <div className="bg-islamic-green/5 p-4 rounded-md mt-2">
                        <p className="font-medium">Recommended Dua:</p>
                        <p className="italic mt-1">"Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun, waj'alna lil-muttaqina imama"</p>
                        <p className="mt-1 text-sm">"Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous." (Quran 25:74)</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Supporting Your Wife</h3>
                      <p>
                        The Prophet Muhammad (peace be upon him) emphasized being kind and gentle with pregnant wives. Take on additional household responsibilities, ensure she has nutritious meals, and create a peaceful environment at home.
                      </p>
                      <p className="text-sm italic text-gray-600 mt-2">
                        "The best of you are those who are best to their wives." (Tirmidhi)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Choosing a Name</h3>
                      <p>
                        Begin researching meaningful Islamic names. The Prophet (peace be upon him) said: "On the Day of Resurrection, you will be called by your names and your fathers' names, so give yourselves good names." (Abu Dawud)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-islamic-green/5 p-4 rounded-md">
                          <h4 className="font-medium">Boy Names</h4>
                          <p className="text-sm mt-1">Consider names of prophets (Muhammad, Ibrahim, Yusuf) or names with beautiful meanings like Abdullah (servant of Allah) or Abdul Rahman (servant of the Most Merciful).</p>
                        </div>
                        <div className="bg-islamic-green/5 p-4 rounded-md">
                          <h4 className="font-medium">Girl Names</h4>
                          <p className="text-sm mt-1">Consider names like Maryam (mother of Isa), Fatimah (daughter of the Prophet), Aisha, or names with beautiful meanings like Noor (light) or Rahma (mercy).</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )}
              
                {activeTab === 'after-birth' && (
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                    <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-3">
                      <Baby className="h-5 w-5 text-islamic-teal" />
                    </div>
                      <CardTitle className="text-xl sm:text-2xl">After Baby's Arrival</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                      Islamic practices and responsibilities after birth
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">First Seven Days</h3>
                      <div className="bg-islamic-green/5 p-4 rounded-md">
                        <p className="font-medium">Day 1:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                          <li>Recite Adhan in right ear and Iqama in left ear</li>
                          <li>Perform Tahneek (date in the mouth)</li>
                          <li>Express gratitude to Allah through dua and dhikr</li>
                        </ul>
                      </div>
                      
                      <div className="bg-islamic-green/5 p-4 rounded-md mt-3">
                        <p className="font-medium">By Day 7:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                          <li>Perform Aqeeqah ceremony (two sheep for boy, one for girl)</li>
                          <li>Name the child with a beautiful Islamic name</li>
                          <li>Shave the baby's head and give silver or gold equivalent to hair weight in charity</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Aqeeqah Ceremony Details</h3>
                      <p>
                        The Aqeeqah is a way to thank Allah for blessing you with a child. Traditionally held on the 7th, 14th, or 21st day after birth, it involves:
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sacrificing animals (following proper Islamic guidelines)</li>
                        <li>Distributing the meat to family, friends, and the poor</li>
                        <li>Hosting a gathering to celebrate the newborn</li>
                        <li>Announcing the child's name</li>
                      </ul>
                      <p className="text-sm italic text-gray-600 mt-2">
                        "Every child is in pledge for his Aqeeqah which is sacrificed for him on his seventh day, and he is given a name, and his head is shaved." (Tirmidhi)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-islamic-green">Circumcision (Khitan)</h3>
                      <p>
                        While there's no specific time mandated for circumcision, many parents choose to have it done when the baby is young. Consider:
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Consulting with a Muslim doctor experienced in the procedure</li>
                        <li>Some perform it shortly after birth, others during the Aqeeqah, and some wait a few years</li>
                        <li>Ensure proper aftercare and cleanliness</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                )}
                
                {activeTab === 'financial' && (
                  <Card>
                    <CardHeader className="p-4 sm:p-6">
                      <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-3">
                        <Heart className="h-5 w-5 text-islamic-teal" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Islamic Financial Planning</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        Financial preparations following Islamic principles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-islamic-green">Zakat and Sadaqah</h3>
                        <p>
                          Consider setting aside a portion of your income for your child's future through Islamic financial instruments. This includes:
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Setting up a dedicated savings account for your child's education</li>
                          <li>Contributing to Islamic investment funds that comply with Shariah principles</li>
                          <li>Regular sadaqah (charity) in your child's name to build blessings</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-islamic-green">Islamic Savings Plans</h3>
                        <div className="bg-islamic-green/5 p-4 rounded-md">
                          <h4 className="font-medium">Recommended Savings Vehicles:</h4>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                            <li>Islamic Education Savings Plans (Takaful-based)</li>
                            <li>Halal Investment Portfolios</li>
                            <li>Gold Savings (as per Islamic tradition)</li>
                            <li>Property Investment (Shariah-compliant)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-islamic-green">Aqeeqah and Financial Planning</h3>
                        <p>
                          The Aqeeqah ceremony also has financial aspects to consider:
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Setting aside funds for the Aqeeqah ceremony (two sheep for a boy, one for a girl)</li>
                          <li>Planning for the distribution of meat to family and the needy</li>
                          <li>Budgeting for the celebration gathering</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-islamic-green">Long-term Financial Planning</h3>
                        <div className="bg-islamic-green/5 p-4 rounded-md">
                          <h4 className="font-medium">Consider these Islamic financial goals:</h4>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                            <li>Setting up a Waqf (endowment) for your child's education</li>
                            <li>Planning for Hajj expenses when they reach adulthood</li>
                            <li>Creating a halal investment portfolio for their future</li>
                            <li>Setting aside funds for their marriage (Mahr)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-islamic-green">Islamic Financial Wisdom</h3>
                        <p>
                          Remember these important principles:
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Always ensure investments are Shariah-compliant</li>
                          <li>Balance between saving for the future and giving in charity</li>
                          <li>Teach your child about Islamic financial principles from an early age</li>
                          <li>Consider the importance of both material and spiritual wealth</li>
                        </ul>
                        <p className="text-sm italic text-gray-600 mt-2">
                          "The best of what a man leaves behind are three: a righteous child who makes dua for him, ongoing charity the reward of which reaches him, and knowledge that is acted upon after him." (Ibn Majah)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === 'checklist' && (
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                    <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-3">
                      <Calendar className="h-5 w-5 text-islamic-teal" />
                    </div>
                      <CardTitle className="text-xl sm:text-2xl">Preparation Checklist</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        Track your preparations and tasks
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-islamic-green flex items-center">
                          <Clock className="h-5 w-5 mr-2" /> Before Birth
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item1" />
                              <label htmlFor="item1" className="ml-2">Research and plan Aqeeqah ceremony</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Research Aqeeqah")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item2" />
                              <label htmlFor="item2" className="ml-2">Choose Islamic name options</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Choose name options")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item3" />
                              <label htmlFor="item3" className="ml-2">Find pediatrician experienced with circumcision</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Find pediatrician")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item4" />
                              <label htmlFor="item4" className="ml-2">Purchase dates for Tahneek</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Purchase dates")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-islamic-green flex items-center">
                          <User className="h-5 w-5 mr-2" /> First Week After Birth
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item5" />
                              <label htmlFor="item5" className="ml-2">Prepare for reciting Adhan in baby's ear</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Adhan recitation")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item6" />
                              <label htmlFor="item6" className="ml-2">Plan date for Aqeeqah ceremony</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Set Aqeeqah date")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item7" />
                              <label htmlFor="item7" className="ml-2">Arrange for head shaving and charity</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Head shaving arrangement")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                            <div className="flex items-center">
                              <Checkbox id="item8" />
                              <label htmlFor="item8" className="ml-2">Support arrangements for wife's postpartum period</label>
                            </div>
                            <Button size="sm" onClick={() => handleSaveReminder("Postpartum support")}>
                              <Bell className="h-4 w-4 mr-1" /> Remind
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center pt-4">
                    <Button className="bg-islamic-teal hover:bg-islamic-teal/90">
                      Download Complete Checklist
                    </Button>
                  </CardFooter>
                </Card>
                )}
              
                {activeTab === 'journal' && (
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                    <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-3">
                      <Book className="h-5 w-5 text-islamic-teal" />
                    </div>
                      <CardTitle className="text-xl sm:text-2xl">My Notes</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        Keep track of your thoughts and preparations
                    </CardDescription>
                  </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Your Notes
                      </label>
                      <Textarea 
                        placeholder="Write your thoughts, duas, or plans for welcoming your baby..."
                        className="min-h-[200px]"
                      />
                    </div>
                    <Button onClick={handleSaveNotes} className="w-full">Save Notes</Button>
                  </CardContent>
                </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BabyPrep;
