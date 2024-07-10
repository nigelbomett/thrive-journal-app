import { FlatList, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Separator, SizableText, View, XStack,YStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { formatDateTime } from "../utils/ui";




interface JournalEntry {
    id: number;
    title: string;
    content:string;
    category:string;
    date:string;
}

interface JournalEntryListProps {
    entries: JournalEntry[];
    onEdit: (id:number) => void;
    onDelete: (id:number) => void;
}

type AwesomeIcon = 'user-secret' | 'plane' | 'briefcase';

const JournalEntryList: React.FC<JournalEntryListProps> = ({entries,onEdit,onDelete}) => {
    return (      
        <FlatList
        data={entries}
        keyExtractor={(item: {id:{toString: () => any;};}) =>
        item.id.toString()}
        renderItem={({item}) => (
          <View>
          <Card elevate size="$5" width={355} marginTop="$4" onPress={() => onEdit(item.id)} borderRadius={0}>
          <YStack width="100%" marginHorizontal={15} padding="$5">
            
                <Paragraph fontWeight="800">{formatDateTime(item.date)}</Paragraph>
              <Paragraph fontWeight="800">{item.title}</Paragraph>
            <Separator marginVertical={15} />
            <XStack height={20} alignItems="center">
              <FontAwesome name={item.category as AwesomeIcon} size={20} color={'#E67E33'} />
              <Separator alignSelf="stretch" vertical marginHorizontal={15} />
              <SizableText width={180} numberOfLines={1} ellipsizeMode='tail'>{item.content}</SizableText>
            </XStack>
          </YStack>
        </Card>
          </View>
        )}
        
        />
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    entriesList:{
      alignItems:'center'
    }
});

export default JournalEntryList