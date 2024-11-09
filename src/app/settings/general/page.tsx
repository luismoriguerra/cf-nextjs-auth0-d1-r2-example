import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getSession } from '@auth0/nextjs-auth0/edge';

import { PlusCircle } from 'lucide-react';

export const runtime = 'edge';

export default async function General() {
    const { user } = (await getSession()) || {};

    return user ? (
        <div className="__dark min-h-screen bg-background p-4">
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                        This is how others will see you on the site.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-2">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.picture} alt="Profile picture" />
                            <AvatarFallback>{user.nickname}</AvatarFallback>
                        </Avatar>
                        {/* <Label htmlFor="avatar-upload" className="cursor-pointer">
                            <div className="flex items-center space-x-2">
                                <Upload className="h-4 w-4" />
                                <span>Change avatar</span>
                            </div>
                        </Label> */}
                        {/* <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        /> */}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                defaultValue={user.sub}
                                className="max-w-[400px]"
                                disabled
                            />
                            <p className="text-sm text-muted-foreground">
                                This is your unique identifier.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                defaultValue={user.nickname}
                                className="max-w-[400px]"
                                disabled
                            />
                            <p className="text-sm text-muted-foreground">
                                This is your public display name. It can be your real name or a
                                pseudonym. You can only change this once every 30 days.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Select>
                                <SelectTrigger className="max-w-[400px]">
                                    <SelectValue placeholder={user.email} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={user.email}>{user.email}</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">
                                You can manage verified email addresses in your email settings.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                defaultValue="I own a computer."
                                className="min-h-[100px]"
                            />
                            <p className="text-sm text-muted-foreground">
                                You can @mention other users and organizations to link to them.
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled size="lg">Update profile</Button>
                </CardFooter>
            </Card>
        </div>
    ) : (
        <div>Loading...</div>
    );
}
